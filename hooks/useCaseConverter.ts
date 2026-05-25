import { icons } from "@/components/icons";
import { copyToClipboard } from "@/utils";
import { ChangeEvent, useState } from "react"

export const useCaseConverter = () => {

    const options = [
        { label: `${icons.uppercase} UPPER CASE`, value: "upper" },
        { label: `${icons.lowercase} lower case`, value: "lower" },
        { label: `${icons.checkList} Title Case`, value: "title" },
        { label: `${icons.camel} camel Case`, value: "camel" },
        { label: `${icons.snake} snake_case`, value: "snake" },
        { label: `${icons.link} kebab-case`, value: "kebab" },
        { label: `${icons.page} Sentence case`, value: "sentence" },
    ];

    const defaultValue = options[0].value;

    const [caseConverter, setCaseConverter] = useState(defaultValue);
    const [content, setContent] = useState('');
    const [convertedContent, setConvertedContent] = useState('');

    const onCaseChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setCaseConverter(value);
        setConvertedContent(convertText(content, value));
    }

    const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        setContent(value);
        setConvertedContent(convertText(value, caseConverter));
    }

    const onCopy = () => {
        copyToClipboard({ value: convertedContent });
    }

    const convertText = (text: string, type: string) => {

        const trimmed = text.trim();

        if (!trimmed) return '';

        switch (type) {

            case 'upper':
                return trimmed.toUpperCase();

            case 'lower':
                return trimmed.toLowerCase();

            case 'title':
                return trimmed.replace(
                    /\w\S*/g,
                    word =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                );

            case 'camel':
                return trimmed
                    .toLowerCase()
                    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) =>
                        char.toUpperCase()
                    );

            case 'snake':
                return trimmed
                    .toLowerCase()
                    .replace(/[^a-zA-Z0-9]+/g, '_')
                    .replace(/^_+|_+$/g, '');

            case 'kebab':
                return trimmed
                    .toLowerCase()
                    .replace(/[^a-zA-Z0-9]+/g, '-')
                    .replace(/^-+|-+$/g, '');

            case 'sentence':
                return trimmed
                    .toLowerCase()
                    .replace(
                        /(^\s*\w|[.!?]\s*\w)/g,
                        char => char.toUpperCase()
                    );

            default:
                return trimmed;
        }
    }

    return {
        caseConverter,
        options,
        onCaseChange,
        onCopy,
        content,
        onContentChange,
        convertedContent
    }
}