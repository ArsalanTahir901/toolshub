import { useCallback, useMemo } from "react";

interface Props {
    textareaRef: React.RefObject<HTMLTextAreaElement | null>;
    isMdMode: boolean;
    setActiveInput: (value: string) => void;
}

export const useEditorActions = ({
    textareaRef,
    isMdMode,
    setActiveInput,
}: Props) => {
    const wrapSelection = useCallback((before: string, after: string) => {
        if (!isMdMode) return;

        const ta = textareaRef.current;

        if (!ta) return;

        const {
            selectionStart: s,
            selectionEnd: e,
            value,
        } = ta;

        const selected = value.slice(s, e) || "text";

        const next =
            value.slice(0, s) +
            before +
            selected +
            after +
            value.slice(e);

        setActiveInput(next);

        requestAnimationFrame(() => {
            ta.setSelectionRange(
                s + before.length,
                s + before.length + selected.length,
            );

            ta.focus();
        });
    },
        [
            isMdMode,
            textareaRef,
            setActiveInput,
        ],
    );

    const insertText = useCallback((text: string) => {
        if (!isMdMode) return;

        const ta = textareaRef.current;

        if (!ta) return;

        const {
            selectionStart: s,
            value,
        } = ta;

        const next =
            value.slice(0, s) +
            text +
            value.slice(s);

        setActiveInput(next);

        requestAnimationFrame(() => {
            ta.setSelectionRange(
                s + text.length,
                s + text.length,
            );

            ta.focus();
        });
    },
        [
            isMdMode,
            textareaRef,
            setActiveInput,
        ],
    );

    const toolbar = useMemo(() => ({
        bold: () => wrapSelection("**", "**"),

        italic: () => wrapSelection("*", "*"),

        strike: () => wrapSelection("~~", "~~"),

        code: () => wrapSelection("`", "`"),

        codeBlock: () => wrapSelection("\n```\n", "\n```\n",),

        h1: () => insertText("\n# "),

        h2: () => insertText("\n## "),

        h3: () => insertText("\n### "),

        link: () => wrapSelection("[", "](url)",),

        image: () => insertText("![alt text](url)",),

        quote: () => insertText("\n> "),

        ul: () => insertText("\n- "),

        ol: () => insertText("\n1. "),

        hr: () => insertText("\n---\n"),

        table: () => insertText(
            "\n| Col 1 | Col 2 | Col 3 |\n|-------|-------|-------|\n| Cell  | Cell  | Cell  |\n",
        ),
    }),
        [wrapSelection, insertText,],
    );

    return {
        toolbar,
        wrapSelection,
        insertText,
    };
};