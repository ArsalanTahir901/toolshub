import { copyToClipboard } from "@/utils";
import { ChangeEvent, useState } from "react"

export const useUrlSlugGenerator = () => {

    const [value, setValue] = useState('');
    const [slug, setSlug] = useState('');

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setValue(value)
    }

    const onGenerate = () => {
        const trimmed = value.trim();
        if (!trimmed) return;
        const slug = trimmed
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '');

        setSlug(slug);
        onCopy();
    }

    const onCopy = () => {
        copyToClipboard({ value: slug });
    }

    return {
        value,
        onChange,
        slug,
        onGenerate,
        onCopy
    }
}