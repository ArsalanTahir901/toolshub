import { Button } from "@/components/buttons";
import { History } from "@/utils/percentage-calculator";

interface Props {
    clearHistory: () => void;
    history: History[]
}

export const HistorySection = ({ clearHistory, history }: Props) => {
    if (!history.length) return null;
    return (
        <div className="w-full flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <span className="text-xs text-(--muted)">
                    History ({history.length})
                </span>
                <Button
                    onClick={clearHistory}
                    className="text-xs"
                >
                    Clear
                </Button>
            </div>
            <div className="flex flex-col gap-1.5">
                {history.map((h, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between rounded-lg border border-(--border) bg-(--card) px-3 py-2"
                    >
                        <div className="flex flex-col gap-0.5">
                            <span className="text-xs text-(--muted)">{h.mode}</span>
                            <span className="text-sm font-mono text-foreground">
                                {h.result.formula}
                            </span>
                        </div>
                        <span className="text-sm font-bold font-mono text-violet-300 shrink-0 ml-3">
                            {h.result.main}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}