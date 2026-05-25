import { Button } from "@/components/buttons"
import { icons } from "@/components/icons";
import { CalcResult } from "@/utils/percentage-calculator"

interface Props {
    result: CalcResult | null
    copyResult: () => void
    copyAll: () => void;
}

export const Results = ({ result, copyAll, copyResult }: Props) => {

    if (!result) return null;

    return (
        <div className="w-full flex flex-col gap-2 mb-2">
            {/* Main answer */}
            <div className="w-full rounded-xl border border-violet-500/20 bg-violet-500/5 px-4 py-4 flex items-center justify-between gap-3">
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-(--muted)">Result</span>
                    <span className="text-3xl font-bold font-mono text-violet-300 tabular-nums">
                        {result.main}
                    </span>
                    <span className="text-xs font-mono text-(--muted) mt-1">
                        {result.formula}
                    </span>
                </div>
                <div className="flex flex-col gap-1 shrink-0">
                    <Button onClick={copyResult} className="text-xs px-2 py-1">
                        {icons.copy} Copy
                    </Button>
                    <Button onClick={copyAll} className="text-xs px-2 py-1">
                        {icons.copy} Copy All
                    </Button>
                </div>
            </div>

            {/* Extra insights */}
            {result.extra.length > 0 && (
                <div className="w-full flex flex-col gap-1.5">
                    {result.extra.map((line, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-2 rounded-lg border border-(--border) bg-(--card) px-3 py-2 text-sm text-foreground"
                        >
                            <span className="text-violet-400 shrink-0">→</span>
                            <span>{line}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}