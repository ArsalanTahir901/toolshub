import { copyToClipboard } from "@/utils";
import { buildRegex, buildSegments, findMatches, RegexComputation, RegexFlag, sanitizeFlags } from "@/utils/regex-tester";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";


export const useRegexTester = () => {

    const [pattern, setPattern] = useState("");
    const [testText, setTestText] = useState("");
    const [replaceWith, setReplaceWith] = useState("");
    const [flags, setFlags] = useState<RegexFlag[]>(["g"]);

    // ─── Main Regex Processing ────────────────────────────────────────────────

    const { regex, matches, segments, error }: RegexComputation = useMemo(() => {
        const { regex, error } = buildRegex(pattern, flags);

        if (!regex || error) {
            return {
                regex: null,
                matches: [],
                segments: [],
                error,
            };
        }

        const foundMatches = findMatches(
            regex,
            testText,
            flags.includes("g")
        );

        const highlightSegments = buildSegments(
            testText,
            foundMatches
        );

        return {
            regex,
            matches: foundMatches,
            segments: highlightSegments,
            error: "",
        };
    }, [pattern, testText, flags]);

    // Live Replace Preview

    const replaced = useMemo(() => {
        if (!regex || !testText) return "";

        try {
            // Create immutable-safe regex copy for replacement
            const safeRegex = new RegExp(regex.source, regex.flags);

            return testText.replace(safeRegex, replaceWith);
        } catch {
            return "";
        }
    }, [regex, testText, replaceWith]);

    // Input Handlers

    const onPatternChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPattern(e.target.value);
    }, []);

    const onTextChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        setTestText(e.target.value);
    }, []);

    const onReplaceChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setReplaceWith(e.target.value);
    }, []);

    // Flag Controls

    const toggleFlag = useCallback((flag: RegexFlag) => {
        setFlags((prev) =>
            prev.includes(flag)
                ? prev.filter((f) => f !== flag)
                : [...prev, flag]
        );
    }, []);

    const loadPattern = useCallback(
        (newPattern: string, patternFlags: string) => {
            setPattern(newPattern);
            setFlags(sanitizeFlags(patternFlags));
            setReplaceWith("");
        },
        []
    );

    // Actions

    const clear = useCallback(() => {
        setPattern("");
        setTestText("");
        setReplaceWith("");
        setFlags(["g"]);
    }, []);

    const doReplace = useCallback(() => {
        if (!regex) {
            toast.error("Fix the regex first");
            return;
        }

        if (!testText) {
            toast.error("Enter test text first");
            return;
        }

        toast.success("Replacement ready!");
    }, [regex, testText]);

    // Copy Utilities

    const copyMatches = useCallback(() => {
        if (!matches.length) return;

        copyToClipboard({
            value: matches
                .map(
                    (match, index) =>
                        `${index + 1}: ${match.value}`
                )
                .join("\n"),
        });
    }, [matches]);

    const copyReplaced = useCallback(() => {
        if (!replaced) return;

        copyToClipboard({
            value: replaced,
        });
    }, [replaced]);

    const copyRegex = useCallback(() => {
        if (!pattern.trim()) return;

        copyToClipboard({
            value: `/${pattern}/${flags.join("")}`,
        });
    }, [pattern, flags]);

    // Stats

    const stats = useMemo(() => ({
        matchCount: matches.length,
        charsCovered: matches.reduce(
            (acc, match) => acc + match.value.length,
            0
        ),
        hasGroups: matches.some(
            (match) =>
                match.groups &&
                Object.keys(match.groups).length > 0
        ),
    }),
        [matches]
    );

    // Return API

    return {
        pattern,
        testText,
        replaceWith,
        replaced,

        flags,
        error,

        matches,
        segments,
        stats,


        onPatternChange,
        onTextChange,
        onReplaceChange,

        toggleFlag,
        loadPattern,

        doReplace,
        clear,

        copyMatches,
        copyReplaced,
        copyRegex,
    };
};