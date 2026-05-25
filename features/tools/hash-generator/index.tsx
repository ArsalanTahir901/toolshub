'use client'

import { Button } from "@/components/buttons"
import { Spinner } from "@/components/skeletons/spinner"
import { ToolCard } from "@/components/tool-card"
import { useHashGenerator } from "@/hooks/useHashGenerator"
import { ModeSelector } from "./mode-selector"
import { FileUpload } from "./file-upload"
import { AlgoSelector } from "./algo-selector"
import { Progress } from "./progress"
import { Results } from "./results"
import { AlgoCounter } from "./algo-counter"
import { toolsConstant, } from "@/features/tools/registry"
import { icons } from "@/components/icons"
import { ToolsConstantKeyEnums } from "@/types/tools"

const HashGenerator = () => {
    const {
        input,
        inputMode,
        fileName,
        results,
        selected,
        algorithms,
        isProcessing,
        progress,
        fileInputRef,

        onInputChange,
        onModeChange,
        onFileChange,
        toggleAlgorithm,
        generate,
        clear,

        copyHash,
        copyAll,
    } = useHashGenerator()

    return (
        <ToolCard
            {...toolsConstant[ToolsConstantKeyEnums.HASH_GENERATOR]}
            defaultOpen
            textarea={{
                id: 'hash-input',
                name: 'hash-input',
                value: input,
                onChange: onInputChange,
                placeholder: 'Enter text to generate hashes...',
                'aria-label': 'Hash input',
                disabled: inputMode === 'file',
            }}
        >
            {/* Mode Selector */}
            <ModeSelector
                mode={inputMode}
                onModeChange={onModeChange}
            />

            {/* File Upload */}
            {inputMode === 'file' &&
                <FileUpload
                    fileInputRef={fileInputRef}
                    onChange={onFileChange}
                    fileName={fileName}
                    onSelectFile={() => fileInputRef.current?.click()}
                />
            }

            {/* Algorithm Selector */}
            <AlgoSelector
                algorithms={algorithms}
                selected={selected}
                inputMode={inputMode}
                toggleAlgorithm={toggleAlgorithm}
            />

            {/* Selected Count */}
            <AlgoCounter selectedLength={selected.length} resultLength={results.length} />

            {/* Progress */}
            <Progress progress={progress} visible={isProcessing && inputMode === "file"} />

            {/* Actions */}
            <div className="w-full flex flex-wrap gap-2">
                <Button
                    variant="glow"
                    onClick={generate}
                    disabled={isProcessing}
                    className="sm:flex-1"
                >
                    {isProcessing ? <Spinner /> : `${icons.zap} Generate`}
                </Button>

                <Button
                    onClick={copyAll}
                    disabled={!results.length}
                    className="sm:flex-1"
                >
                    {icons.copy} Copy All
                </Button>

                <Button
                    onClick={clear}
                    disabled={isProcessing}
                >
                    {icons.bin}
                </Button>
            </div>

            {/* Results */}
            <Results
                results={results}
                copyHash={copyHash}
            />

            {/* Empty State */}
            {!results.length && (
                <div className="result-box w-full text-center">
                    Generated hashes appear here
                </div>
            )}
        </ToolCard>
    )
}

export default HashGenerator