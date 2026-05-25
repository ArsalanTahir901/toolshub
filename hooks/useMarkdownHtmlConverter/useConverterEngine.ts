import { icons } from "@/components/icons";
import type {
    ConverterMode,
    EditorStats,
} from "@/utils/markdown-to-html";

import {
    useCallback,
    useDeferredValue,
    useEffect,
    useMemo,
    useState,
} from "react";

import toast from "react-hot-toast";

type MarkdownUtilsModule = typeof import("@/utils/markdown-to-html");

const DEFAULT_MD_FALLBACK = `# Welcome to Markdown ⇄ HTML Converter

Start writing **Markdown** here and see the live preview on the right.`;

const fallbackGetStats = (
    text: string,
    isHtml = false,
): EditorStats => {
    const plain = isHtml
        ? text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
        : text;

    const words = plain.trim()
        ? plain.trim().split(/\s+/).length
        : 0;

    const chars = text.length;
    const lines = text.split("\n").length;
    const minutes = Math.max(1, Math.ceil(words / 200));

    return {
        words,
        chars,
        lines,
        readTime: `${minutes} min read`,
    };
};

export const useConverterEngine = () => {
    const [markdownUtils, setMarkdownUtils] = useState<MarkdownUtilsModule | null>(null);

    const [converterMode, setConverterMode] = useState<ConverterMode>("md-to-html");

    const [md, setMd] = useState(DEFAULT_MD_FALLBACK);
    const [htmlInput, setHtmlInput] = useState("");

    const [renderedHtml, setRenderedHtml] = useState("");
    const [convertedMd, setConvertedMd] = useState("");

    const deferredMd = useDeferredValue(md);
    const deferredHtmlInput = useDeferredValue(htmlInput);

    const ensureMarkdownUtils = useCallback(async (): Promise<MarkdownUtilsModule | null> => {
        if (markdownUtils) return markdownUtils;

        try {
            const mod = await import("@/utils/markdown-to-html");

            setMarkdownUtils(mod);

            setMd((prev) =>
                prev === DEFAULT_MD_FALLBACK
                    ? mod.DEFAULT_MD
                    : prev,
            );

            return mod;
        } catch {
            toast.error("Failed to load markdown engine");
            return null;
        }
    }, [markdownUtils]);

    const setMdWithLazyLoad = useCallback((value: string) => {
        if (!markdownUtils) {
            void ensureMarkdownUtils();
        }

        setMd(value);
    },
        [markdownUtils, ensureMarkdownUtils],
    );

    const setHtmlInputWithLazyLoad = useCallback(
        (value: string) => {
            if (!markdownUtils) {
                void ensureMarkdownUtils();
            }

            setHtmlInput(value);
        },
        [markdownUtils, ensureMarkdownUtils],
    );

    useEffect(() => {
        let active = true;

        if (!markdownUtils) {
            return () => {
                active = false;
            };
        }

        void markdownUtils
            .convertMarkdownToHtml(deferredMd)
            .then((html) => {
                if (!active) return;
                setRenderedHtml(html);
            })
            .catch(() => {
                if (!active) return;
                setRenderedHtml("");
            });

        return () => {
            active = false;
        };
    }, [deferredMd, markdownUtils]);

    useEffect(() => {
        let active = true;

        if (!deferredHtmlInput.trim()) {
            return () => {
                active = false;
            };
        }

        if (!markdownUtils) {
            return () => {
                active = false;
            };
        }

        void markdownUtils
            .convertHtmlToMarkdown(deferredHtmlInput)
            .then((value) => {
                if (!active) return;
                setConvertedMd(value);
            })
            .catch(() => {
                if (!active) return;
                setConvertedMd(
                    `${icons.caution} Could not parse HTML. Make sure it is valid.`,
                );
            });

        return () => {
            active = false;
        };
    }, [deferredHtmlInput, markdownUtils]);

    const isMdMode = converterMode === "md-to-html";

    const safeRenderedHtml = markdownUtils ? renderedHtml : "";

    const safeConvertedMd = deferredHtmlInput.trim() && markdownUtils ? convertedMd : "";

    const activeInput = isMdMode ? md : htmlInput;

    const activeOutput = isMdMode ? safeRenderedHtml : safeConvertedMd;

    const setActiveInput = useCallback((value: string) => {
        if (isMdMode) {
            setMdWithLazyLoad(value);
        } else {
            setHtmlInputWithLazyLoad(value);
        }
    },
        [
            isMdMode,
            setMdWithLazyLoad,
            setHtmlInputWithLazyLoad,
        ],
    );

    const stats = useMemo(() =>
        markdownUtils
            ? markdownUtils.getStats(
                activeInput,
                !isMdMode,
            )
            : fallbackGetStats(
                activeInput,
                !isMdMode,
            ),
        [
            markdownUtils,
            activeInput,
            isMdMode,
        ],
    );

    return {
        markdownUtils,

        md,
        htmlInput,

        renderedHtml: safeRenderedHtml,
        convertedMd: safeConvertedMd,

        converterMode,
        setConverterMode,

        isMdMode,

        activeInput,
        activeOutput,

        setActiveInput,

        setMd: setMdWithLazyLoad,
        setHtmlInput: setHtmlInputWithLazyLoad,

        stats,
    };
};