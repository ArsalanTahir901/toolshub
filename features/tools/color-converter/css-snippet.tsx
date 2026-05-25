import { icons } from "@/components/icons";
import { ColorResult } from "@/utils/color-converter";

interface Props {
    copyValue: (val: string) => void;
    result: ColorResult
}

export const CssSnippet = ({ copyValue, result }: Props) => {
    return (
        <div className="w-full rounded-xl border border-(--border) bg-(--card) px-3 py-2.5 mt-1">
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-(--muted)">CSS variables</span>
                <button
                    onClick={() => copyValue(
                        `--color-primary: ${result.hex};\n--color-primary-rgb: ${result.rgb.r}, ${result.rgb.g}, ${result.rgb.b};\n--color-primary-hsl: ${result.hsl.h}, ${result.hsl.s}%, ${result.hsl.l}%;`
                    )}
                    className="text-xs text-(--muted) hover:text-foreground transition-colors"
                >
                    {icons.copy} Copy
                </button>
            </div>
            <pre className="text-xs font-mono text-foreground whitespace-pre">
                {` 
                --color-primary: ${result.hex}; 
                --color-primary-rgb: ${result.rgb.r}, ${result.rgb.g}, ${result.rgb.b};
                --color-primary-hsl: ${result.hsl.h}, ${result.hsl.s}%, ${result.hsl.l}%;
                `}
            </pre>
        </div>
    )
}