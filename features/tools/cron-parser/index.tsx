'use client'
import { ToolCard } from "@/components/tool-card"
import { useCronParser } from "@/hooks/useCronParser";
import { toolsConstant, ToolsConstantKeyEnums } from "../registry";
import { FieldPill } from "./field-pill";
import { CronInput } from "./cron-input";
import { Description } from "./description";
import { NextRuns } from "./next-runs";
import { Presets } from "./presets";

const CronParser = () => {
    const {
        expr,
        result,
        onExprChange,
        loadPreset,
        copyExpr,
        copyNextRuns,
    } = useCronParser()

    return (
        <ToolCard
            {...toolsConstant[ToolsConstantKeyEnums.CRON_PARSER]}
            defaultOpen
        >
            {/* Cron input */}
            <CronInput
                error={result.error}
                isValid={result.valid}
                onChange={onExprChange}
                value={expr}
                onCopy={copyExpr}
            />

            {/* Presets */}
            <Presets expr={expr} loadPreset={loadPreset} />

            {/* Field breakdown */}
            <FieldPill result={result} />

            {/* Human description */}
            <Description visible={result.valid && !!result.description} description={result.description} />

            {/* Next runs */}
            <NextRuns copyNextRuns={copyNextRuns} result={result} />

            {/* Placeholder */}
            {!result.valid && !result.error && (
                <div className="result-box w-full text-center">
                    Enter a cron expression above
                </div>
            )}

        </ToolCard>
    )
}

export default CronParser