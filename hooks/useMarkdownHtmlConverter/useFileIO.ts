import type { ConverterMode } from "@/utils/markdown-to-html";

import {
    ChangeEvent,
    useCallback,
    useRef,
} from "react";

import toast from "react-hot-toast";

type MarkdownUtilsModule =
    typeof import("@/utils/markdown-to-html");

interface Props {
    md: string;
    htmlInput: string;
    renderedHtml: string;
    convertedMd: string;

    fileName: string;

    markdownUtils: MarkdownUtilsModule | null;

    isMdMode: boolean;

    setMd: (value: string) => void;
    setHtmlInput: (value: string) => void;

    setConverterMode: (
        mode: ConverterMode,
    ) => void;
}

export const useFileIO = ({
    md,
    htmlInput,
    renderedHtml,
    convertedMd,

    fileName,

    markdownUtils,

    isMdMode,

    setMd,
    setHtmlInput,

    setConverterMode,
}: Props) => {
    const fileInputRef =
        useRef<HTMLInputElement>(null);

    const openFile = () => {
        fileInputRef.current?.click();
    };

    const onFileChange = useCallback(
        (
            e: ChangeEvent<HTMLInputElement>,
        ) => {
            const file =
                e.target.files?.[0];

            if (!file) return;

            const validExtensions = [
                ".md",
                ".txt",
                ".html",
            ];

            const validMimeTypes = [
                "text/markdown",
                "text/plain",
                "text/html",
                "application/xhtml+xml",
            ];

            const hasValidExt =
                validExtensions.some((ext) =>
                    file.name
                        .toLowerCase()
                        .endsWith(ext),
                );

            const hasValidMime =
                file.type === "" ||
                validMimeTypes.includes(
                    file.type,
                );

            if (
                !hasValidExt ||
                !hasValidMime
            ) {
                toast.error(
                    "Only .md, .txt, or .html files are supported",
                );

                return;
            }

            const isHtml =
                file.name
                    .toLowerCase()
                    .endsWith(".html");

            const reader =
                new FileReader();

            reader.onload = () => {
                const content =
                    reader.result as string;

                if (isHtml) {
                    setHtmlInput(content);

                    setConverterMode(
                        "html-to-md",
                    );
                } else {
                    setMd(content);

                    setConverterMode(
                        "md-to-html",
                    );
                }

                toast.success(
                    `Opened: ${file.name}`,
                );
            };

            reader.readAsText(file);

            e.target.value = "";
        },
        [
            setMd,
            setHtmlInput,
            setConverterMode,
        ],
    );

    const downloadMd = useCallback(() => {
        const content = isMdMode
            ? md
            : convertedMd;

        const blob = new Blob(
            [content],
            {
                type: "text/markdown",
            },
        );

        const url =
            URL.createObjectURL(blob);

        const a = Object.assign(
            document.createElement("a"),
            {
                href: url,
                download: `${fileName}.md`,
            },
        );

        a.click();

        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 1000);

        toast.success(
            "Markdown downloaded!",
        );
    }, [
        isMdMode,
        md,
        convertedMd,
        fileName,
    ]);

    const downloadHtml = useCallback(() => {
        const isFullDoc =
            /<html[\s>]/i.test(htmlInput);

        const buildHtmlDocument =
            markdownUtils
                ?.buildHtmlDocument ??
            ((body: string, title = "Document") =>
                `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>${title}</title></head><body>${body}</body></html>`);

        const doc = isMdMode
            ? buildHtmlDocument(
                renderedHtml,
                fileName,
            )
            : isFullDoc
                ? htmlInput
                : buildHtmlDocument(
                    htmlInput,
                    fileName,
                );

        const blob = new Blob(
            [doc],
            {
                type: "text/html",
            },
        );

        const url =
            URL.createObjectURL(blob);

        const a = Object.assign(
            document.createElement("a"),
            {
                href: url,
                download: `${fileName}.html`,
            },
        );

        a.click();

        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 1000);

        toast.success(
            "HTML downloaded!",
        );
    }, [
        markdownUtils,
        isMdMode,
        renderedHtml,
        htmlInput,
        fileName,
    ]);

    return {
        fileInputRef,

        openFile,
        onFileChange,

        downloadMd,
        downloadHtml,
    };
};