import { copyToClipboard } from "@/utils";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";

// Types
export type IndentValue = 2 | 4 | 8 | "tab";
export type ViewMode = "formatted" | "minified";
export type IndentOptions = { value: IndentValue; label: string }

export const INDENT_OPTIONS: IndentOptions[] = [
    { value: 2, label: "2 spaces" },
    { value: 4, label: "4 spaces" },
    { value: 8, label: "8 spaces" },
    { value: "tab", label: "Tab" },
];


export const useJsonFormatter = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [indent, setIndent] = useState<IndentValue>(2);
    const [viewMode, setViewMode] = useState<ViewMode>("formatted");
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);


    const reset = useCallback(() => {
        setOutput("");
        setError("");
        setIsValid(null);
    }, []);

    const getIndentValue = useCallback(
        (): number | string => (indent === "tab" ? "\t" : indent),
        [indent]
    );

    // Shared JSON processor
    const processJson = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (callback: (parsed: any) => void) => {
            if (!input.trim()) {
                toast.error("Paste JSON first");
                return;
            }

            reset();
            setIsProcessing(true);

            requestAnimationFrame(() => {
                try {
                    const parsed = JSON.parse(input);
                    callback(parsed);
                    setIsValid(true);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (e: any) {
                    const msg = e?.message ?? "Invalid JSON";
                    setError(msg);
                    setIsValid(false);
                    toast.error("Invalid JSON");
                } finally {
                    setIsProcessing(false);
                }
            });
        },
        [input, reset]
    );


    const onInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
        reset();
    };

    const onIndentChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setIndent(val === "tab" ? "tab" : (Number(val) as IndentValue));
    };


    const format = () => {
        processJson((parsed) => {
            const formatted = JSON.stringify(
                parsed,
                null,
                getIndentValue()
            );

            setOutput(formatted);
            setViewMode("formatted");
            toast.success("JSON formatted!");
        });
    };


    const minify = () => {
        processJson((parsed) => {
            const minified = JSON.stringify(parsed);

            setOutput(minified);
            setViewMode("minified");
            toast.success("JSON minified!");
        });
    };


    const validate = () => {
        processJson(() => {
            setOutput("");
            toast.success("Valid JSON!");
        });
    };


    const clear = () => {
        setInput("");
        reset();
    };


    const onCopy = () => {
        if (!output.trim()) return;
        copyToClipboard({ value: output });
    };


    const stats = useMemo(() => {
        if (!output) return null;

        try {
            const parsed = JSON.parse(output);

            // Iterative key counter (safer than recursion)
            let keyCount = 0;
            const stack = [parsed];

            while (stack.length) {
                const current = stack.pop();

                if (
                    typeof current === "object" &&
                    current !== null
                ) {
                    const keys = Object.keys(current);
                    keyCount += keys.length;

                    for (const key of keys) {
                        stack.push(current[key]);
                    }
                }
            }

            return {
                size: new TextEncoder().encode(output).length,
                lines: output.split("\n").length,
                keys: keyCount,
            };
        } catch {
            return null;
        }
    }, [output]);

    return {
        // state
        input,
        output,
        error,
        indent,
        viewMode,
        isValid,
        isProcessing,
        stats,

        // options
        indentOptions: INDENT_OPTIONS,

        // handlers
        onInputChange,
        onIndentChange,
        format,
        minify,
        validate,
        clear,
        onCopy,
    };
};