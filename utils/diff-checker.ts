// ─── Types ────────────────────────────────────────────────────────────────────

export type DiffMode = "chars" | "words" | "lines";
export type DiffType = "equal" | "insert" | "delete";

export type DiffPart = {
    type: DiffType;
    value: string;
};

export type LineDiff = {
    type: DiffType;
    lineNum: number | null; // null = placeholder for alignment
    lineNumB: number | null;
    value: string;
    parts?: DiffPart[];   // inline char diff for changed lines
};

export type DiffStats = {
    added: number;
    removed: number;
    changed: number;
    same: number;
};

export const MODE_OPTIONS: { value: DiffMode; label: string; title: string }[] = [
    { value: "lines", label: "Lines", title: "Line-by-line diff" },
    { value: "words", label: "Words", title: "Word-by-word diff" },
    { value: "chars", label: "Characters", title: "Character-level diff" },
];

// ─── LCS-based diff algorithm ─────────────────────────────────────────────────

export function lcsTable(a: string[], b: string[]): number[][] {
    const m = a.length, n = b.length;
    const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++)
        for (let j = 1; j <= n; j++)
            dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    return dp;
}

export function backtrack(dp: number[][], a: string[], b: string[], i: number, j: number): DiffPart[] {
    if (i === 0 && j === 0) return [];
    if (i === 0) return [...backtrack(dp, a, b, i, j - 1), { type: "insert", value: b[j - 1] }];
    if (j === 0) return [...backtrack(dp, a, b, i - 1, j), { type: "delete", value: a[i - 1] }];
    if (a[i - 1] === b[j - 1]) return [...backtrack(dp, a, b, i - 1, j - 1), { type: "equal", value: a[i - 1] }];
    if (dp[i - 1][j] >= dp[i][j - 1])
        return [...backtrack(dp, a, b, i - 1, j), { type: "delete", value: a[i - 1] }];
    return [...backtrack(dp, a, b, i, j - 1), { type: "insert", value: b[j - 1] }];
}

export function diffTokens(a: string[], b: string[]): DiffPart[] {
    // Guard against very long inputs to prevent stack overflow
    if (a.length > 2000 || b.length > 2000) {
        return [
            ...a.map((v) => ({ type: "delete" as DiffType, value: v })),
            ...b.map((v) => ({ type: "insert" as DiffType, value: v })),
        ];
    }
    const dp = lcsTable(a, b);
    return backtrack(dp, a, b, a.length, b.length);
}

// ─── Tokenizers ───────────────────────────────────────────────────────────────

export const tokenize = (text: string, mode: DiffMode): string[] => {
    if (mode === "lines") return text.split("\n");
    if (mode === "words") return text.split(/(\s+)/);
    return text.split("");
};

// ─── Line diff builder ────────────────────────────────────────────────────────

export function buildLineDiff(a: string, b: string): LineDiff[] {
    const linesA = a.split("\n");
    const linesB = b.split("\n");
    const parts = diffTokens(linesA, linesB);

    const result: LineDiff[] = [];
    let numA = 1, numB = 1;

    for (const part of parts) {
        if (part.type === "equal") {
            result.push({ type: "equal", lineNum: numA++, lineNumB: numB++, value: part.value });
        } else if (part.type === "delete") {
            result.push({ type: "delete", lineNum: numA++, lineNumB: null, value: part.value });
        } else {
            result.push({ type: "insert", lineNum: null, lineNumB: numB++, value: part.value });
        }
    }

    return result;
}

// ─── Inline char diff for a single changed line pair ─────────────────────────

export function inlineCharDiff(a: string, b: string): { aParts: DiffPart[]; bParts: DiffPart[] } {
    const chars = diffTokens(a.split(""), b.split(""));
    const aParts: DiffPart[] = [];
    const bParts: DiffPart[] = [];

    for (const p of chars) {
        if (p.type === "equal") { aParts.push(p); bParts.push(p); }
        if (p.type === "delete") aParts.push(p);
        if (p.type === "insert") bParts.push(p);
    }

    return { aParts, bParts };
}

// ─── Stats ────────────────────────────────────────────────────────────────────

export function computeStats(lines: LineDiff[]): DiffStats {
    let added = 0, removed = 0, same = 0;
    for (const l of lines) {
        if (l.type === "insert") added++;
        else if (l.type === "delete") removed++;
        else same++;
    }
    return { added, removed, changed: added + removed, same };
}