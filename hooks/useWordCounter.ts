import { copyToClipboard } from "@/utils";
import { useState } from "react";

export const useWordCounter = () => {

    const [value, setValue] = useState('');
    const [stats, setStats] = useState<string[]>([]);

    const countWords = (val: string) => {
        setValue(val);
        const words = val.trim() === '' ? 0 : val.trim().split(/\s+/).length;
        const chars = val.length;
        const sentences = val.split(/[.!?]+/).filter(s => s.trim()).length;
        const paragraphs = val.split(/\n+/).filter(p => p.trim()).length;
        setStats([
            `Words: ${words}`,
            `Chars: ${chars}`,
            `Sentences: ${sentences}`,
            `Paragraphs: ${paragraphs}`
        ]);
    }

    const onCopy = () => {
        copyToClipboard({ value })
    }

    const onClear = () => {
        setValue('');
        setStats([])
    }

    return {
        value,
        stats,
        countWords,
        onClear,
        onCopy
    }
}