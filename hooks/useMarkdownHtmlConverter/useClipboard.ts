import { useCallback } from "react";

import toast from "react-hot-toast";

type MarkdownUtilsModule =
    typeof import("@/utils/markdown-to-html");

const fallbackCopyToClipboard = async (
    text: string,
): Promise<void> => {
    try {
        await navigator.clipboard.writeText(text);
    } catch {
        const ta =
            document.createElement("textarea");

        ta.value = text;

        ta.style.cssText =
            "position:fixed;opacity:0;pointer-events:none;";

        document.body.appendChild(ta);

        ta.focus();
        ta.select();

        document.execCommand("copy");

        document.body.removeChild(ta);
    }
};

interface Props {
    markdownUtils: MarkdownUtilsModule | null;
    activeInput: string;
    activeOutput: string;
    isMdMode: boolean;
}

export const useClipboard = ({
    markdownUtils,
    activeInput,
    activeOutput,
    isMdMode,
}: Props) => {
    const copySource = useCallback(async () => {
        try {
            if (markdownUtils) {
                await markdownUtils.copyToClipboard(
                    activeInput,
                );
            } else {
                await fallbackCopyToClipboard(
                    activeInput,
                );
            }

            toast.success(
                isMdMode
                    ? "Markdown copied!"
                    : "HTML copied!",
            );
        } catch {
            toast.error("Copy failed");
        }
    }, [
        markdownUtils,
        activeInput,
        isMdMode,
    ]);

    const copyOutput = useCallback(async () => {
        try {
            if (markdownUtils) {
                await markdownUtils.copyToClipboard(
                    activeOutput,
                );
            } else {
                await fallbackCopyToClipboard(
                    activeOutput,
                );
            }

            toast.success(
                isMdMode
                    ? "HTML copied!"
                    : "Markdown copied!",
            );
        } catch {
            toast.error("Copy failed");
        }
    }, [
        markdownUtils,
        activeOutput,
        isMdMode,
    ]);

    return {
        copySource,
        copyOutput,
    };
};