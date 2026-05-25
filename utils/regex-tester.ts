export type RegexFlag = "g" | "i" | "m" | "s" | "u";

export type Match = {
    value: string;
    index: number;
    end: number;
    groups: Record<string, string> | null;
};

export type HighlightSegment = {
    text: string;
    isMatch: boolean;
    matchIndex: number;
};

export type RegexComputation = {
    regex: RegExp | null;
    matches: Match[];
    segments: HighlightSegment[];
    error: string;
};

// Constants

export const VALID_FLAGS: RegexFlag[] = ["g", "i", "m", "s", "u"];

export const FLAG_INFO: { flag: RegexFlag; label: string; desc: string }[] = [
    { flag: "g", label: "g", desc: "Global — find all matches" },
    { flag: "i", label: "i", desc: "Case insensitive" },
    { flag: "m", label: "m", desc: "Multiline — ^ and $ match per line" },
    { flag: "s", label: "s", desc: "Dot matches newline" },
    { flag: "u", label: "u", desc: "Unicode mode" },
];

// Common Patterns

export const COMMON_PATTERNS: {
    label: string;
    pattern: string;
    flags: string;
}[] = [
        {
            label: "Email",
            pattern:
                "[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}",
            flags: "gi",
        },
        {
            label: "URL",
            pattern:
                "https?:\\/\\/[\\w\\-]+(\\.[\\w\\-]+)+([\\w.,@?^=%&:/~+#\\-]*[\\w@?^=%&/~+#\\-])?",
            flags: "gi",
        },
        {
            label: "Phone (US)",
            pattern: "\\(?\\d{3}\\)?[\\s.\\-]?\\d{3}[\\s.\\-]?\\d{4}",
            flags: "g",
        },
        {
            label: "IPv4",
            pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b",
            flags: "g",
        },
        {
            label: "Hex Color",
            pattern: "#(?:[0-9a-fA-F]{3}){1,2}\\b",
            flags: "gi",
        },
        {
            label: "Date MM/DD/YYYY",
            pattern:
                "\\b(0?[1-9]|1[0-2])[\\/\\-](0?[1-9]|[12]\\d|3[01])[\\/\\-](\\d{4})\\b",
            flags: "g",
        },
        {
            label: "Digits only",
            pattern: "\\d+",
            flags: "g",
        },
        {
            label: "Words only",
            pattern: "\\b[a-zA-Z]+\\b",
            flags: "g",
        },
        {
            label: "Whitespace",
            pattern: "\\s+",
            flags: "g",
        },
        {
            label: "HTML tag",
            pattern: "<[^>]+>",
            flags: "gi",
        },
    ];

// Utility Helpers

export const sanitizeFlags = (flags: string): RegexFlag[] =>
    flags
        .split("")
        .filter(
            (flag): flag is RegexFlag =>
                VALID_FLAGS.includes(flag as RegexFlag)
        );

export const buildRegex = (
    pattern: string,
    flags: RegexFlag[]
): { regex: RegExp | null; error: string } => {
    if (!pattern.trim()) {
        return {
            regex: null,
            error: "",
        };
    }

    try {
        return {
            regex: new RegExp(pattern, flags.join("")),
            error: "",
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        return {
            regex: null,
            error: err?.message ?? "Invalid regex",
        };
    }
};

export const findMatches = (
    regex: RegExp,
    text: string,
    isGlobal: boolean
): Match[] => {
    if (!text) return [];

    const matches: Match[] = [];

    if (isGlobal) {
        regex.lastIndex = 0;

        let match: RegExpExecArray | null;

        while ((match = regex.exec(text)) !== null) {
            matches.push({
                value: match[0],
                index: match.index,
                end: match.index + match[0].length,
                groups: match.groups ?? null,
            });

            // Prevent infinite loop on zero-length matches
            if (match[0].length === 0) {
                regex.lastIndex++;
            }
        }
    } else {
        const match = regex.exec(text);

        if (match) {
            matches.push({
                value: match[0],
                index: match.index,
                end: match.index + match[0].length,
                groups: match.groups ?? null,
            });
        }
    }

    return matches;
};

export const buildSegments = (
    text: string,
    matches: Match[]
): HighlightSegment[] => {
    if (!text) return [];

    if (!matches.length) {
        return [
            {
                text,
                isMatch: false,
                matchIndex: -1,
            },
        ];
    }

    const segments: HighlightSegment[] = [];
    let cursor = 0;

    matches.forEach((match, index) => {
        if (match.index > cursor) {
            segments.push({
                text: text.slice(cursor, match.index),
                isMatch: false,
                matchIndex: -1,
            });
        }

        segments.push({
            text: match.value,
            isMatch: true,
            matchIndex: index,
        });

        cursor = match.end;
    });

    if (cursor < text.length) {
        segments.push({
            text: text.slice(cursor),
            isMatch: false,
            matchIndex: -1,
        });
    }

    return segments;
};