'use client'
import { Button } from "@/components/buttons"
import { ToolCard } from "@/components/tool-card"
import { usePercentageCalculator } from "@/hooks/usePercentageCalculator"
import { ModeGrid } from "./mode-grid"
import { Inputs } from "./inputs"
import { ErrorMsg } from "@/components/error-msg"
import { Results } from "./results"
import { HistorySection } from "./history"
import { toolsConstant } from "@/features/tools/registry"
import { icons } from "@/components/icons"
import { ToolsConstantKeyEnums } from "@/types/tools"

const PercentageCalculator = () => {
    const {
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
        clear,
        clearHistory,
        copyResult,
        copyAll,
    } = usePercentageCalculator();

    return (
        <ToolCard
            {...toolsConstant[ToolsConstantKeyEnums.PERCENTAGE_CALCULATOR]}
            defaultOpen
        >
            {/* Mode grid */}
            <ModeGrid
                mode={mode}
                onModeChange={onModeChange}
            />

            {/* Inputs */}
            <Inputs
                calc={calc}
                currentMode={currentMode}
                inputA={inputA}
                inputB={inputB}
                mode={mode}
                onInputAChange={onInputAChange}
                onInputBChange={onInputBChange}
            />

            {/* Error */}
            <ErrorMsg error={error} />

            {/* Buttons */}
            <div className="flex gap-2 my-2">
                <Button variant="glow" onClick={calc} className="flex-1">
                    {icons.zap} Calculate
                </Button>
                <Button onClick={clear}>{icons.bin}</Button>
            </div>

            {/* Result */}
            <Results
                copyAll={copyAll}
                copyResult={copyResult}
                result={result}
            />

            {/* Placeholder */}
            {!result && !error && (
                <div className="result-box w-full text-center">
                    Result appears here
                </div>
            )}

            {/* History */}
            <HistorySection
                clearHistory={clearHistory}
                history={history}
            />
        </ToolCard>
    )
}

export default PercentageCalculator;