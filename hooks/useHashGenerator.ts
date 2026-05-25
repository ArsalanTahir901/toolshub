'use client';

import { copyToClipboard } from '@/utils';
import { ALGORITHMS, HashAlgorithm, hashFile, HashResult, hashText, InputMode, MAX_FILE_SIZE, MAX_TEXT_LENGTH } from '@/utils/hash-generator';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import toast from 'react-hot-toast';

export const useHashGenerator = () => {
    const [input, setInput] = useState('');
    const [inputMode, setInputMode] = useState<InputMode>('text');

    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState('');

    const [results, setResults] = useState<HashResult[]>([]);
    const [selected, setSelected] = useState<HashAlgorithm[]>(ALGORITHMS);

    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Input

    const onInputChange = useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>) => {
            setInput(e.target.value);
            setResults([]);
        },
        []
    );

    const onModeChange = useCallback((mode: InputMode) => {
        setInputMode(mode);

        setInput('');
        setFile(null);
        setFileName('');
        setResults([]);
        setProgress(0);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, []);

    // File

    const onFileChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const selectedFile = e.target.files?.[0];
            if (!selectedFile) return;

            if (selectedFile.size > MAX_FILE_SIZE) {
                toast.error('File too large');
                return;
            }

            setFile(selectedFile);
            setFileName(selectedFile.name);
            setResults([]);
            setProgress(0);

            e.target.value = '';
        },
        []
    );

    // Toggle Algorithms

    const toggleAlgorithm = useCallback(
        (algo: HashAlgorithm) => {
            setSelected((prev) =>
                prev.includes(algo)
                    ? prev.length === 1
                        ? prev
                        : prev.filter((a) => a !== algo)
                    : [...prev, algo]
            );
        },
        []
    );

    // Generate

    const generate = useCallback(async () => {
        const isText = inputMode === 'text';

        if (isText && !input.trim()) {
            toast.error('Enter text first');
            return;
        }

        if (isText && input.length > MAX_TEXT_LENGTH) {
            toast.error('Text too large');
            return;
        }

        if (!isText && !file) {
            toast.error('Select a file first');
            return;
        }

        setResults([]);
        setProgress(0);
        setIsProcessing(true);

        try {
            let output: HashResult[];

            if (isText) {
                output = await hashText(input, selected);
            } else {
                output = await hashFile(
                    file!,
                    selected,
                    setProgress
                );
            }

            setResults(output);
            toast.success('Hashes generated!');
        } catch (error) {
            console.error(error);
            toast.error('Generation failed');
        } finally {
            setIsProcessing(false);
        }
    }, [input, inputMode, file, selected]);

    // Clear

    const clear = useCallback(() => {
        setInput('');
        setFile(null);
        setFileName('');
        setResults([]);
        setProgress(0);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, []);

    // Copy

    const copyHash = useCallback((hash: string) => {
        copyToClipboard({ value: hash });
    }, []);

    const copyAll = useCallback(() => {
        if (!results.length) return;

        copyToClipboard({
            value: results
                .map((r) => `${r.algorithm}: ${r.hash}`)
                .join('\n'),
        });
    }, [results]);

    return {
        // State
        input,
        inputMode,
        fileName,
        results,
        selected,
        isProcessing,
        progress,

        // Constants
        algorithms: ALGORITHMS,

        // Refs
        fileInputRef,

        // Actions
        onInputChange,
        onModeChange,
        onFileChange,
        toggleAlgorithm,
        generate,
        clear,

        // Copy
        copyHash,
        copyAll,
    };
};