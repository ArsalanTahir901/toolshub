import { copyToClipboard } from "@/utils";
import { buildLineDiff, computeStats, DiffMode, diffTokens, inlineCharDiff, MODE_OPTIONS, tokenize } from "@/utils/diff-checker";
import { ChangeEvent, useMemo, useState } from "react";
import toast from "react-hot-toast";

export const useDiffChecker = () => {

    const [textA, setTextA] = useState("");
    const [textB, setTextB] = useState("");
    const [mode, setMode] = useState<DiffMode>("lines");
    const [inline, setInline] = useState(true);   // show inline char diff
    const [unified, setUnified] = useState(false);  // show unified vs side-by-side

    // Compute diff

    const { lineDiff, wordDiff, charDiff, stats } = useMemo(() => {
        if (!textA && !textB) {
            return { lineDiff: [], wordDiff: [], charDiff: [], stats: null };
        }

        const lines = buildLineDiff(textA, textB);
        const stats = computeStats(lines);

        // Inline char diff — pair delete+insert neighbours
        if (inline) {
            for (let i = 0; i < lines.length - 1; i++) {
                if (lines[i].type === "delete" && lines[i + 1]?.type === "insert") {
                    const { aParts, bParts } = inlineCharDiff(lines[i].value, lines[i + 1].value);
                    lines[i].parts = aParts;
                    lines[i + 1].parts = bParts;
                }
            }
        }

        const wordsA = tokenize(textA, "words");
        const wordsB = tokenize(textB, "words");
        const wordDiff = diffTokens(wordsA, wordsB);

        const charsA = tokenize(textA, "chars");
        const charsB = tokenize(textB, "chars");
        const charDiff = diffTokens(charsA, charsB);

        return { lineDiff: lines, wordDiff, charDiff, stats };
    }, [textA, textB, inline]);

    // ─── Active diff parts for word/char mode ─────────────────────────────────

    const activeParts = mode === "words" ? wordDiff : mode === "chars" ? charDiff : [];

    // ─── Handlers ─────────────────────────────────────────────────────────────

    const onTextAChange = (e: ChangeEvent<HTMLTextAreaElement>) => setTextA(e.target.value);
    const onTextBChange = (e: ChangeEvent<HTMLTextAreaElement>) => setTextB(e.target.value);
    const onModeChange = (m: DiffMode) => setMode(m);

    const swap = () => {
        setTextA(textB);
        setTextB(textA);
    };

    const clear = () => {
        setTextA("");
        setTextB("");
    };

    // ─── Export unified diff ──────────────────────────────────────────────────

    const exportDiff = () => {
        if (!lineDiff.length) { toast.error("Nothing to export"); return; }

        const lines: string[] = ["--- Original", "+++ Modified", ""];
        for (const l of lineDiff) {
            if (l.type === "delete") lines.push(`- ${l.value}`);
            else if (l.type === "insert") lines.push(`+ ${l.value}`);
            else lines.push(`  ${l.value}`);
        }

        const blob = new Blob([lines.join("\n")], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "diff.patch";
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        toast.success("Diff exported!");
    };

    const copyDiff = () => {
        if (!lineDiff.length) return;
        const text = lineDiff
            .map((l) => `${l.type === "delete" ? "-" : l.type === "insert" ? "+" : " "} ${l.value}`)
            .join("\n");
        copyToClipboard({ value: text });
    };

    // hasDiff = actual changes exist (not just equal lines)
    const hasDiff = stats !== null && stats.changed > 0;
    // isIdentical = both entered, computed, but zero changes
    const isIdentical = stats !== null && stats.changed === 0 && (!!textA || !!textB);

    return {
        textA,
        textB,
        mode,
        inline,
        unified,
        lineDiff,
        activeParts,
        stats,
        hasDiff,
        isIdentical,
        modeOptions: MODE_OPTIONS,
        onTextAChange,
        onTextBChange,
        onModeChange,
        setInline,
        setUnified,
        swap,
        clear,
        exportDiff,
        copyDiff,
    };
};