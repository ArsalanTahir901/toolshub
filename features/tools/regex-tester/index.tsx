'use client'
import { Button } from "@/components/buttons"
import { ToolCard } from "@/components/tool-card"
import { useRegexTester } from "@/hooks/useRegexTester";
import { CommonPattern } from "./common-pattern";
import { RegexPatternInput } from "./regex-pattern-input";
import { Flags } from "./flags";
import { HighlightPreview } from "./highlight-preview";
import { MatchList } from "./match-list";
import { ReplaceSection } from "./replace-section";
import { toolsConstant, } from "@/features/tools/registry";
import { icons } from "@/components/icons";
import { ToolsConstantKeyEnums } from "@/types/tools"

// Highlighted test text
// Cycles through 4 highlight colors for multiple matches
const MATCH_COLORS = [
    "bg-violet-500/25 text-violet-200 ring-1 ring-violet-500/40",
    "bg-cyan-500/25 text-cyan-200 ring-1 ring-cyan-500/40",
    "bg-amber-500/25 text-amber-200 ring-1 ring-amber-500/40",
    "bg-green-500/25 text-green-200 ring-1 ring-green-500/40",
];

const RegexTester = () => {
    const {
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
    } = useRegexTester()

    const hasMatches = matches.length > 0;


    return (
        <ToolCard
            {...toolsConstant[ToolsConstantKeyEnums.REGEX_TESTER]}
            defaultOpen
            textarea={{
                id: 'regex-test-text',
                name: 'regex-test-text',
                value: testText,
                onChange: onTextChange,
                placeholder: 'Paste test text here…',
                'aria-label': 'Test text',
            }}
        >
            {/* Common patterns library*/}
            <CommonPattern loadPattern={loadPattern} pattern={pattern} />

            {/* Regex pattern input */}
            <RegexPatternInput error={error} flags={flags} value={pattern} onChange={onPatternChange} />

            {/* Flag toggles */}
            <Flags
                flags={flags}
                hasMatches={hasMatches}
                matchCount={stats.matchCount}
                noMatch={Boolean(pattern && !error && !hasMatches && testText)}
                toggleFlag={toggleFlag}
            />

            {/* Live highlight preview */}
            {testText && segments.length > 0 &&
                <HighlightPreview
                    MATCH_COLORS={MATCH_COLORS}
                    copyMatches={copyMatches}
                    hasMatches={hasMatches}
                    segments={segments}
                />}

            {/* Match list */}
            {hasMatches && <MatchList
                stats={stats}
                MATCH_COLORS={MATCH_COLORS}
                matches={matches}
            />}

            {/* Replace section*/}
            <ReplaceSection
                value={replaceWith}
                onChange={onReplaceChange}
                doReplace={doReplace}
                disableReplaceBtn={!pattern || !testText}
                copyReplaced={copyReplaced}
                replaced={replaced}
            />

            {/* Copy regex + Clear*/}
            <div className="w-full flex gap-2">
                <Button onClick={copyRegex} disabled={!pattern} className="flex-1">
                    {icons.copy} Copy /{pattern}/{[...flags].join("")}
                </Button>
                <Button onClick={clear}>{icons.bin}</Button>
            </div>
        </ToolCard>
    )
}

export default RegexTester;