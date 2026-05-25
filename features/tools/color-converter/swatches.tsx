import { SWATCHES } from "@/utils/color-converter"

interface Props {
    onSwatchClick: (hex: string) => void
}

export const Swatches = ({ onSwatchClick }: Props) => {
    return (
        <div className="w-full flex flex-col gap-1.5 mb-3">
            <span className="text-xs text-(--muted)">Swatches</span>
            <div className="flex flex-wrap gap-2">
                {SWATCHES.map((hex) => (
                    <button
                        key={hex}
                        onClick={() => onSwatchClick(hex)}
                        title={hex}
                        aria-label={`Select ${hex}`}
                        className="size-7 cursor-pointer rounded-lg border border-(--border) transition-transform hover:scale-110 hover:ring-2 hover:ring-white/20"
                        style={{ backgroundColor: hex }}
                    />
                ))}
            </div>
        </div>
    )
}