import { Button } from "@/components/buttons"
import { icons } from "@/components/icons"
import { Label } from "@/components/label"
import { ColorResult } from "@/utils/color-converter"
import { InputHTMLAttributes } from "react"

interface Props {
    result: ColorResult | null
    onPickerChange: InputHTMLAttributes<HTMLInputElement>['onChange']
    clear: () => void
}

export const ColorPickerAndPreview = ({ result, onPickerChange, clear }: Props) => {
    return (
        <div className="w-full flex items-center gap-3 mb-3">
            <div className="relative">
                <input
                    type="color"
                    value={result?.hex ?? "#3b82f6"}
                    onChange={onPickerChange}
                    aria-label="Color picker"
                    className="sr-only"
                    id="color-picker"
                />
                <Label
                    htmlFor="color-picker"
                    className="block size-12 rounded-xl border border-(--border) cursor-pointer shadow-inner transition-transform hover:scale-105"
                    style={{ backgroundColor: result?.hex ?? "#3b82f6" }}
                    title="Click to open color picker"
                />
            </div>

            <div className="flex-1 flex flex-col gap-1">
                <span
                    className="text-lg font-mono font-bold"
                    style={{ color: result?.hex ?? "#3b82f6" }}
                >
                    {result?.hex ?? "#3b82f6"}
                </span>
                {result && (
                    <span className="text-xs text-(--muted)">
                        rgb({result.rgb.r}, {result.rgb.g}, {result.rgb.b})
                    </span>
                )}
            </div>

            <Button onClick={clear} className="shrink-0">{icons.bin}</Button>
        </div>
    )
}