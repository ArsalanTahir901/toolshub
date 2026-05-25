import { Button } from "@/components/buttons"
import { icons } from "@/components/icons";
import { HighlightSegment } from "@/utils/regex-tester";

interface Props {
    hasMatches: boolean;
    copyMatches: () => void;
    segments: HighlightSegment[]
    MATCH_COLORS: string[]
}

export const HighlightPreview = ({ MATCH_COLORS, segments, copyMatches, hasMatches }: Props) => {
    return (
        <div className="w-full flex flex-col gap-1.5 mb-2">
            <div className="flex items-center justify-between">
                <span className="text-xs text-(--muted)">Match preview</span>
                {hasMatches && (
                    <Button onClick={copyMatches} className="text-xs px-2 py-1">
                        {icons.copy} Copy matches
                    </Button>
                )}
            </div>
            <div className="w-full rounded-xl border border-(--border) bg-(--card) p-3 text-sm font-mono leading-relaxed break-all max-h-48 overflow-y-auto">
                {segments.map((seg, i) =>
                    seg.isMatch ? (
                        <mark
                            key={i}
                            className={`rounded px-0.5 ${MATCH_COLORS[seg.matchIndex % MATCH_COLORS.length]}`}
                        >
                            {seg.text}
                        </mark>
                    ) : (
                        <span key={i} className="text-foreground">
                            {seg.text}
                        </span>
                    )
                )}
            </div>
        </div>
    )
}