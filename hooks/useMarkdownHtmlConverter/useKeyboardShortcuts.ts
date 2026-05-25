import { RefObject, useEffect } from "react";

interface Props {
    textareaRef: RefObject<HTMLTextAreaElement | null>;
    downloadMd: () => void;
    wrapSelection: (
        before: string,
        after: string,
    ) => void;
}

export const useKeyboardShortcuts = ({
    textareaRef,
    downloadMd,
    wrapSelection,
}: Props) => {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (!e.ctrlKey && !e.metaKey) {
                return;
            }

            switch (e.key) {
                case "s":
                    e.preventDefault();
                    downloadMd();
                    break;

                case "b":
                    if (
                        document.activeElement ===
                        textareaRef.current
                    ) {
                        e.preventDefault();

                        wrapSelection(
                            "**",
                            "**",
                        );
                    }

                    break;

                case "i":
                    if (
                        document.activeElement ===
                        textareaRef.current
                    ) {
                        e.preventDefault();

                        wrapSelection(
                            "*",
                            "*",
                        );
                    }

                    break;
            }
        };

        window.addEventListener(
            "keydown",
            handler,
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handler,
            );
        };
    }, [
        textareaRef,
        downloadMd,
        wrapSelection,
    ]);
};