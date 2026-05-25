'use client'
import { Button } from "@/components/buttons"
import { ToolCard } from "@/components/tool-card"
import { OutputRow } from "./output"
import { useColorConverter } from "@/hooks/useColorConverter"
import { ColorPickerAndPreview } from "./color-picker-and-preview"
import { Swatches } from "./swatches"
import { ErrorMsg } from "@/components/error-msg"
import { ManualInput } from "./manual-input"
import { CssSnippet } from "./css-snippet"
import { Tab } from "@/components/tab"
import { ColorFormat, FORMATS } from "@/utils/color-converter"
import { toolsConstant } from "@/features/tools/registry"
import { icons } from "@/components/icons"
import { ToolsConstantKeyEnums } from "@/types/tools"

const ColorConverter = () => {
    const {
        inputFormat,
        rawInput,
        result,
        error,
        onRawChange,
        onFormatChange,
        onPickerChange,
        onSwatchClick,
        copyValue,
        copyAll,
        clear,
    } = useColorConverter()

    return (
        <ToolCard
            {...toolsConstant[ToolsConstantKeyEnums.COLOR_CONVERTER]}
            defaultOpen
        >
            {/* Color picker + preview */}
            <ColorPickerAndPreview
                clear={clear}
                onPickerChange={onPickerChange}
                result={result}
            />

            {/* Swatches */}
            <Swatches onSwatchClick={onSwatchClick} />

            {/* Format tab */}
            <Tab
                activeVal={inputFormat as ColorFormat}
                data={FORMATS}
                onClick={(val) => { onFormatChange(val as ColorFormat) }}
            />

            {/* Manual input */}
            <ManualInput
                inputFormat={inputFormat}
                value={rawInput}
                onChange={onRawChange}
            />

            {/* Error */}
            <ErrorMsg error={error} />

            {/* All format outputs */}
            {result && (
                <div className="w-full flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-(--muted)">All formats</span>
                        <Button onClick={copyAll} className="text-xs px-2 py-1">
                            {icons.copy} Copy all
                        </Button>
                    </div>

                    <OutputRow
                        label="HEX"
                        value={result.hex}
                        onCopy={copyValue}
                    />
                    <OutputRow
                        label="RGB"
                        value={`rgb(${result.rgb.r}, ${result.rgb.g}, ${result.rgb.b})`}
                        onCopy={copyValue}
                    />
                    <OutputRow
                        label="HSL"
                        value={`hsl(${result.hsl.h}, ${result.hsl.s}%, ${result.hsl.l}%)`}
                        onCopy={copyValue}
                    />
                    <OutputRow
                        label="HSV"
                        value={`hsv(${result.hsv.h}, ${result.hsv.s}%, ${result.hsv.v}%)`}
                        onCopy={copyValue}
                    />
                    <OutputRow
                        label="CMYK"
                        value={`cmyk(${result.cmyk.c}%, ${result.cmyk.m}%, ${result.cmyk.y}%, ${result.cmyk.k}%)`}
                        onCopy={copyValue}
                    />

                    {/* CSS snippet */}
                    <CssSnippet copyValue={copyValue} result={result} />
                </div>
            )}

            {/* ── Placeholder ── */}
            {!result && !error && (
                <div className="result-box w-full text-center">
                    Color values appear here
                </div>
            )}
        </ToolCard>
    )
}

export default ColorConverter
