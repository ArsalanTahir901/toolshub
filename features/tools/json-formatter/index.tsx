'use client'
import { ToolCard } from "@/components/tool-card"
import { useJsonFormatter } from "@/hooks/useJsonFormatter"
import { IndentSelector } from "./indent-selector"
import { ErrorAlert } from "@/components/error-msg"
import { ValidityBadge } from "./validity-badge"
import { Output } from "./output"
import { ActionButtons } from "./action-buttons"
import { toolsConstant } from "@/features/tools/registry"
import { ToolsConstantKeyEnums } from "@/types/tools"

const JsonFormatter = () => {
    const {
        input,
        output,
        error,
        indent,
        isValid,
        isProcessing,
        stats,
        onInputChange,
        onIndentChange,
        format,
        minify,
        validate,
        clear,
        onCopy,
    } = useJsonFormatter()

    return (
        <ToolCard
            {...toolsConstant[ToolsConstantKeyEnums.JSON_FORMATTER]}
            defaultOpen
            textarea={{
                id: 'json-input',
                name: 'json-input',
                value: input,
                onChange: onInputChange,
                placeholder: '{"name":"John","age":30,"city":"New York"}',
                'aria-label': 'JSON input',
            }}
        >
            {/* Indent selector */}
            <IndentSelector
                value={indent}
                onChange={onIndentChange}
            />

            {/* Action buttons */}
            <ActionButtons
                clear={clear}
                format={format}
                isProcessing={isProcessing}
                minify={minify}
                validate={validate}
            />

            {/* Validity badge */}
            <ValidityBadge isValid={isValid} stats={stats} />

            {/* Error message */}
            <ErrorAlert error={error} />

            {/*  Output */}
            <Output output={output} onCopy={onCopy} />

            {/* Empty result placeholder */}
            {!output && !error && (
                <div className="result-box w-full text-center">
                    Formatted JSON appears here
                </div>
            )}
        </ToolCard>
    )
}

export default JsonFormatter