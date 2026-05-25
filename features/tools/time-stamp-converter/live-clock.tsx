import { Button } from "@/components/buttons"

export const LiveClock = ({
    unix,
    iso,
    relative,
    timezone,
    enabled,
    onToggle,
    onUseNow,
}: {
    unix: number
    iso: string
    relative: string
    timezone: string
    enabled: boolean
    onToggle: (v: boolean) => void
    onUseNow: () => void
}) => (
    <div className="w-full rounded-xl border border-(--border) bg-(--card) px-4 py-3 flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
            <span className="text-xs text-(--muted)">Current time</span>
            <div className="flex items-center gap-2">
                {/* Live toggle */}
                <button
                    onClick={() => onToggle(!enabled)}
                    className={`flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full border transition-all ${enabled
                        ? "border-green-500/30 bg-green-500/10 text-green-400"
                        : "border-(--border) text-(--muted)"
                        }`}
                >
                    <span className={`size-1.5 rounded-full ${enabled ? "bg-green-400 animate-pulse" : "bg-(--muted)"}`} />
                    {enabled ? "Live" : "Paused"}
                </button>
                <Button onClick={onUseNow} className="text-xs px-2 py-1">
                    Use now
                </Button>
            </div>
        </div>

        <div className="flex flex-col gap-0.5">
            <span className="text-xl font-mono font-bold text-foreground tabular-nums">
                {unix}
            </span>
            <span className="text-xs font-mono text-(--muted)">{iso}</span>
            <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-violet-400">{relative}</span>
                <span className="text-xs text-(--muted)">·</span>
                <span className="text-xs text-(--muted)">{timezone}</span>
            </div>
        </div>
    </div>
)