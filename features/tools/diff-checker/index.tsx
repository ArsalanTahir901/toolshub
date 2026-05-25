'use client'
import { Button } from "@/components/buttons"
import { ToolCard } from "@/components/tool-card"
import { useDiffChecker } from "@/hooks/useDiffChecker"
import { DiffMode } from "@/utils/diff-checker"
import { StatsBadge } from './stats-badge'
import { Tab } from "@/components/tab"
import { Toggles } from "./toggles"
import { InputPanels } from "./input-panels"
import { LineDiffView } from "./line-diff-view"
import { WordCharDiffView } from "./word-char-diff-view"
import { toolsConstant } from "@/features/tools/registry"
import { icons } from "@/components/icons"
import { ToolsConstantKeyEnums } from "@/types/tools"

const DiffChecker = () => {
    const {
        textA,
        textB,
        mode,
        inline,
        lineDiff,
        activeParts,
        stats,
        hasDiff,
        isIdentical,
        modeOptions,
        onTextAChange,
        onTextBChange,
        onModeChange,
        setInline,
        swap,
        clear,
        exportDiff,
        copyDiff,
    } = useDiffChecker();

    return (
        <ToolCard
            {...toolsConstant[ToolsConstantKeyEnums.DIFF_CHECKER]}
            defaultOpen
        >
            <div className="w-full flex flex-wrap items-center justify-between gap-2 mb-2">

                {/* Mode pills */}
                <Tab
                    data={modeOptions}
                    activeVal={mode}
                    onClick={(val) => onModeChange(val as DiffMode)}
                />

                {/* Toggles */}
                <Toggles
                    clear={clear}
                    inline={inline}
                    mode={mode}
                    setInline={setInline}
                    swap={swap}
                />
            </div>

            {/* Input panels */}
            <InputPanels
                onTextAChange={onTextAChange}
                onTextBChange={onTextBChange}
                textA={textA}
                textB={textB}
            />

            {/* Diff result */}
            {hasDiff && stats && (
                <div className="w-full flex flex-col gap-3 mt-2">

                    {/* Stats + actions row */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <StatsBadge
                            added={stats.added}
                            removed={stats.removed}
                            same={stats.same}
                        />
                        <div className="flex items-center gap-2">
                            <Button onClick={copyDiff} className="text-xs px-2 py-1">
                                {icons.copy} Copy diff
                            </Button>
                            <Button onClick={exportDiff} className="text-xs px-2 py-1">
                                {icons.download} .patch
                            </Button>
                        </div>
                    </div>

                    {/* Line diff view */}
                    <LineDiffView lineDiff={lineDiff} visible={mode === 'lines'} />

                    {/* Word / Char inline diff view */}
                    <WordCharDiffView mode={mode} parts={activeParts} />
                </div>
            )}

            {/* ── Identical notice: hook computes this cleanly ── */}
            {isIdentical && (
                <div className="w-full mt-2 rounded-xl border border-green-500/20 bg-green-500/5 px-4 py-3 text-sm text-green-400 text-center">
                    {icons.tik} Texts are identical
                </div>
            )}

            {/* ── Placeholder ── */}
            {!textA && !textB && (
                <div className="result-box w-full text-center">
                    Paste text in both boxes to see the diff
                </div>
            )}
        </ToolCard>
    )
}

export default DiffChecker