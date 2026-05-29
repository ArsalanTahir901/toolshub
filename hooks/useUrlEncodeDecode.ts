import { copyToClipboard } from "@/utils";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type Mode = 'encode' | 'decode' | 'auto';

const MODES: { value: Mode; label: string }[] = [
    { value: 'auto', label: 'Auto' },
    { value: 'encode', label: 'Encode' },
    { value: 'decode', label: 'Decode' }
];

type HistoryItem = {
    input: string;
    output: string;
    mode: Mode;
    time: number;
};

export const useUrlEncodeDecode = () => {
    const [input, setInput] = useState('');
    const [mode, setMode] = useState<Mode>('auto');
    const [live, setLive] = useState(true);

    const [baseUrl, setBaseUrl] = useState('');
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');
    const [params, setParams] = useState<{ key: string; value: string }[]>([]);

    const [manualOutput, setManualOutput] = useState('');
    const [history, setHistory] = useState<HistoryItem[]>([]);

    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    // detect encoded string
    const isEncoded = (str: string) => /%[0-9A-Fa-f]{2}/.test(str);

    // core convert function
    const convert = useCallback((text: string, m: Mode) => {
        if (!text) return '';

        try {
            if (m === 'encode') return encodeURIComponent(text);
            if (m === 'decode') return decodeURIComponent(text);

            return isEncoded(text)
                ? decodeURIComponent(text)
                : encodeURIComponent(text);
        } catch {
            return 'Invalid input';
        }
    }, []);

    // LIVE OUTPUT (only when live ON)
    const liveOutput = useMemo(() => {
        if (!live) return '';
        return convert(input, mode);
    }, [input, mode, live, convert]);

    // FINAL OUTPUT (single source of truth for UI)
    const output = live ? liveOutput : manualOutput;

    // history handler
    const pushHistory = useCallback((out: string) => {
        const trimmedInput = input.trim();
        const trimmedOutput = out.trim();

        if (!trimmedInput || !trimmedOutput) {
            return;
        }

        setHistory(prev => {
            const exists = prev.some(
                item =>
                    item.input === trimmedInput &&
                    item.output === trimmedOutput &&
                    item.mode === mode
            );

            if (exists) {
                return prev;
            }

            return [
                {
                    input: trimmedInput,
                    output: trimmedOutput,
                    mode,
                    time: Date.now()
                },
                ...prev.slice(0, 19)
            ];
        });
    }, [input, mode]);

    // LIVE MODE HISTORY (debounced)
    useEffect(() => {
        if (!live) return;

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            pushHistory(liveOutput);
        }, 300);

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [input, mode, liveOutput, live, pushHistory]);

    // MANUAL CONVERT
    const handleManualConvert = useCallback(() => {
        const result = convert(input, mode);
        setManualOutput(result);
        pushHistory(result);
    }, [input, mode, convert, pushHistory]);

    // KEYBOARD SHORTCUT
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'Enter') {
                const result = convert(input, mode);
                setManualOutput(result);
                pushHistory(result);
            }
        };

        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [input, mode, convert, pushHistory]);

    // QUERY PARSER
    const queryParsed = useMemo(() => {
        try {
            const url = input.startsWith('?') ? input.slice(1) : input;
            const params = new URLSearchParams(url);

            const obj: Record<string, string> = {};
            params.forEach((v, k) => (obj[k] = v));

            return JSON.stringify(obj, null, 2);
        } catch {
            return '';
        }
    }, [input]);

    // URL BUILDER
    const builtUrl = useMemo(() => {
        if (!baseUrl) return '';

        const qs = new URLSearchParams();
        params.forEach(p => qs.append(p.key, p.value));

        return `${baseUrl}?${qs.toString()}`;
    }, [baseUrl, params]);

    const addParam = () => {
        if (!key) return;
        setParams(prev => [...prev, { key, value }]);
        setKey('');
        setValue('');
    };

    const removeParam = (index: number) => {
        setParams(prev => prev.filter((_, i) => i !== index));
    };

    const clearAll = () => {
        setInput('');
        setParams([]);
        setBaseUrl('');
        setManualOutput('');
    };

    const handleCopy = (val: string) => {
        copyToClipboard({ value: val });
    };

    const isValidDecode = (str: string) => {
        try {
            decodeURIComponent(str);
            return true;
        } catch {
            return false;
        }
    };

    const handleClearHistory = () => {
        setHistory([])
    }

    return {
        input,
        setInput,

        mode,
        setMode,
        MODES,

        live,
        setLive,

        output,

        history,

        queryParsed,

        baseUrl,
        setBaseUrl,

        key,
        setKey,
        value,
        setValue,

        params,
        addParam,
        removeParam,

        builtUrl,

        clearAll,

        handleCopy,
        isValidDecode,
        handleManualConvert,
        handleClearHistory
    };
};