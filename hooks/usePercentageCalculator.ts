import { copyToClipboard } from "@/utils";
import { CalcMode, CalcResult, calculate, History, MODES } from "@/utils/percentage-calculator";
import { ChangeEvent, useCallback, useMemo, useState } from "react";

export const usePercentageCalculator = () => {
    const [mode, setMode] = useState<CalcMode>("percentOf");
    const [inputA, setInputA] = useState("");
    const [inputB, setInputB] = useState("");
    const [result, setResult] = useState<CalcResult | null>(null);
    const [error, setError] = useState("");
    const [history, setHistory] = useState<History[]>([]);

    const currentMode = useMemo(() => MODES.find((m) => m.value === mode) ?? MODES[0],
        [mode]);

    // Reset

    const reset = useCallback(() => {
        setInputA("");
        setInputB("");
        setResult(null);
        setError("");
    }, []);

    // Handlers

    const onModeChange = useCallback((m: CalcMode) => {
        setMode(m);
        reset();
    },
        [reset]
    );

    const onInputAChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setInputA(e.target.value);
        setError("");
    },
        []
    );

    const onInputBChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setInputB(e.target.value);
        setError("");
    },
        []
    );

    // Calculate

    const calc = useCallback(() => {
        const a = parseFloat(inputA);
        const b = parseFloat(inputB);

        if (inputA.trim() === "" || isNaN(a)) {
            setError(`Enter a valid value for "${currentMode.inputA}"`);
            return;
        }

        if (inputB.trim() === "" || isNaN(b)) {
            setError(`Enter a valid value for "${currentMode.inputB}"`);
            return;
        }

        const res = calculate(mode, a, b);

        if (!res) {
            if (mode === "percentChange") {
                setError("Starting value cannot be zero for percentage change");
            } else {
                setError("Total value cannot be zero");
            }
            return;
        }

        setError("");
        setResult(res);

        setHistory((prev) => {
            const next = {
                mode: currentMode.label,
                result: res,
            };

            if (
                prev[0]?.mode === next.mode &&
                prev[0]?.result.main === next.result.main &&
                prev[0]?.result.formula === next.result.formula
            ) {
                return prev;
            }

            return [next, ...prev.slice(0, 7)];
        });
    }, [inputA, inputB, currentMode, mode]);

    // History

    const clearHistory = useCallback(() => {
        setHistory([]);
    }, []);

    // Copy

    const copyResult = useCallback(() => {
        if (!result) return;

        copyToClipboard({ value: result.main });
    }, [result]);

    const copyAll = useCallback(() => {
        if (!result) return;

        const text = [result.formula, ...result.extra].join("\n");

        copyToClipboard({ value: text });
    }, [result]);

    return {
        mode,
        inputA,
        inputB,
        result,
        error,
        history,
        currentMode,
        onModeChange,
        onInputAChange,
        onInputBChange,
        calc,
        clear: reset,
        clearHistory,
        copyResult,
        copyAll,
    };
};