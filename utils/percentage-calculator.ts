// Types

import { icons } from "@/components/icons";

export type CalcMode =
    | "whatPercent"
    | "percentOf"
    | "percentChange"
    | "addPercent"
    | "subtractPercent"
    | "xOfYIsZ";

export type ModeConfig = {
    value: CalcMode;
    label: string;
    desc: string;
    icon: string;
    inputA: string;
    inputB: string;
    placeholder: [string, string];
};

export const MODES: ModeConfig[] = [
    {
        value: "percentOf",
        label: "% of Number",
        desc: "What is X% of Y?",
        icon: icons.percentage,
        inputA: "Percentage",
        inputB: "Number",
        placeholder: ["25", "200"],
    },
    {
        value: "whatPercent",
        label: "What % is X of Y",
        desc: "X is what percent of Y?",
        icon: icons.numbers,
        inputA: "Value (X)",
        inputB: "Total (Y)",
        placeholder: ["50", "200"],
    },
    {
        value: "percentChange",
        label: "% Change",
        desc: "Percentage change from X to Y",
        icon: icons.graph,
        inputA: "From",
        inputB: "To",
        placeholder: ["80", "100"],
    },
    {
        value: "addPercent",
        label: "Add %",
        desc: "Add X% to a number",
        icon: icons.plus,
        inputA: "Percentage",
        inputB: "Number",
        placeholder: ["15", "500"],
    },
    {
        value: "subtractPercent",
        label: "Subtract %",
        desc: "Subtract X% from a number",
        icon: icons.minus,
        inputA: "Percentage",
        inputB: "Number",
        placeholder: ["20", "250"],
    },
    {
        value: "xOfYIsZ",
        label: "X out of Y",
        desc: "X out of Y as a percentage",
        icon: icons.target,
        inputA: "Score (X)",
        inputB: "Total (Y)",
        placeholder: ["42", "60"],
    },
];

// Result Type 

export type CalcResult = {
    main: string;
    formula: string;
    extra: string[];
};

export type History = { mode: string; result: CalcResult }

// Utilities

export const round = (n: number, dp = 4): number => Math.round(n * 10 ** dp) / 10 ** dp;

export const fmt = (n: number): string => {
    if (!isFinite(n)) return "∞";
    return round(n, 4).toString();
};

// Calculation Logic

export function calculate(mode: CalcMode, a: number, b: number): CalcResult | null {
    switch (mode) {
        case "percentOf": {
            const result = (a / 100) * b;

            return {
                main: `${fmt(result)}`,
                formula: `${fmt(a)}% × ${fmt(b)} = ${fmt(result)}`,
                extra: [
                    `${fmt(a)}% of ${fmt(b)} = ${fmt(result)}`,
                    `Remaining: ${fmt(b - result)} (${fmt(100 - a)}%)`,
                ],
            };
        }

        case "whatPercent": {
            if (b === 0) return null;

            const result = (a / b) * 100;

            return {
                main: `${fmt(result)}%`,
                formula: `(${fmt(a)} ÷ ${fmt(b)}) × 100 = ${fmt(result)}%`,
                extra: [
                    `${fmt(a)} is ${fmt(result)}% of ${fmt(b)}`,
                    `Remaining: ${fmt(b - a)} = ${fmt(100 - result)}%`,
                ],
            };
        }

        case "percentChange": {
            if (a === 0) return null;

            const change = ((b - a) / Math.abs(a)) * 100;
            const dir = change >= 0 ? "increase" : "decrease";

            return {
                main: `${change >= 0 ? "+" : ""}${fmt(change)}%`,
                formula: `((${fmt(b)} − ${fmt(a)}) ÷ |${fmt(a)}|) × 100 = ${fmt(change)}%`,
                extra: [
                    `${fmt(Math.abs(change))}% ${dir} from ${fmt(a)} to ${fmt(b)}`,
                    `Absolute change: ${fmt(b - a)}`,
                ],
            };
        }

        case "addPercent": {
            const added = (a / 100) * b;
            const result = b + added;

            return {
                main: `${fmt(result)}`,
                formula: `${fmt(b)} + (${fmt(a)}% × ${fmt(b)}) = ${fmt(result)}`,
                extra: [
                    `Added amount: ${fmt(added)}`,
                    `${fmt(b)} + ${fmt(added)} = ${fmt(result)}`,
                ],
            };
        }

        case "subtractPercent": {
            const subtracted = (a / 100) * b;
            const result = b - subtracted;

            return {
                main: `${fmt(result)}`,
                formula: `${fmt(b)} − (${fmt(a)}% × ${fmt(b)}) = ${fmt(result)}`,
                extra: [
                    `Subtracted amount: ${fmt(subtracted)}`,
                    `${fmt(b)} − ${fmt(subtracted)} = ${fmt(result)}`,
                ],
            };
        }

        case "xOfYIsZ": {
            if (b === 0) return null;

            const result = (a / b) * 100;

            const grade =
                result >= 90 ? "A" :
                    result >= 80 ? "B" :
                        result >= 70 ? "C" :
                            result >= 60 ? "D" : "F";

            return {
                main: `${fmt(result)}%`,
                formula: `(${fmt(a)} ÷ ${fmt(b)}) × 100 = ${fmt(result)}%`,
                extra: [
                    `${fmt(a)} out of ${fmt(b)} = ${fmt(result)}%`,
                    `Grade equivalent: ${grade}`,
                    `Missed: ${fmt(b - a)} (${fmt(100 - result)}%)`,
                ],
            };
        }

        default:
            return null;
    }
}