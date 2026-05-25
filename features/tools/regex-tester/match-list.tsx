import { Label } from "@/components/label"
import { Match } from "@/utils/regex-tester";

interface Props {
    stats: {
        matchCount: number;
        hasGroups: boolean;
    }
    matches: Match[]
    MATCH_COLORS: string[]
}

export const MatchList = ({ stats, matches, MATCH_COLORS }: Props) => {
    return (
        <div className="w-full flex flex-col gap-1.5 mb-2">
            <Label htmlFor="matchcount" className="text-xs text-(--muted)">
                Matches ({stats.matchCount})
            </Label>
            <div id="matchcount" className="w-full flex flex-col gap-1 max-h-40 overflow-y-auto">
                {matches.map((m, i) => (
                    <div
                        key={i}
                        className="flex items-start gap-3 rounded-lg border border-(--border) bg-(--card) px-3 py-2 text-xs font-mono"
                    >
                        <span className={`shrink-0 rounded px-1.5 py-0.5 ${MATCH_COLORS[i % MATCH_COLORS.length]}`}>
                            #{i + 1}
                        </span>
                        <span className="break-all flex-1 text-foreground">{m.value}</span>
                        <span className="shrink-0 text-(--muted)">
                            [{m.index}-{m.end}]
                        </span>
                    </div>
                ))}
            </div>

            {/* Named groups */}
            {stats.hasGroups && (
                <div className="flex flex-col gap-1 mt-1">
                    <span className="text-xs text-(--muted)">Named groups</span>
                    {matches.map((m, i) =>
                        m.groups && Object.keys(m.groups).length > 0 ? (
                            <div key={i} className="text-xs font-mono text-foreground rounded-lg border border-(--border) bg-(--card) px-3 py-2">
                                {Object.entries(m.groups).map(([k, v]) => (
                                    <span key={k} className="mr-3">
                                        <span className="text-violet-400">{k}</span>: {v}
                                    </span>
                                ))}
                            </div>
                        ) : null
                    )}
                </div>
            )}
        </div>
    )
}