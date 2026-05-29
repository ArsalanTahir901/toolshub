import { Button } from "@/components/buttons"
import { RunRow } from "./run-row"
import { icons } from "@/components/icons"
import { ParseResult } from "@/utils/cron-parser"

interface Props {
    result: ParseResult
    copyNextRuns: () => void
}

export const NextRuns = ({ result, copyNextRuns }: Props) => {

    if (!result.valid && !result.nextRuns.length) return null;

    return (
        <div className="w-full flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <span className="text-xs text-(--muted)">
                    Next {result.nextRuns.length} scheduled runs
                </span>
                <Button
                    onClick={copyNextRuns}
                    className="text-xs px-2 py-1"
                    aria-label="Copy all next run times"
                >
                    {icons.copy} Copy all
                </Button>
            </div>
            <div
                role="list"
                aria-label="Upcoming scheduled runs"
                className="flex flex-col gap-1.5"
            >
                {result.nextRuns.map((d, i) => (
                    <RunRow key={i} date={d} index={i} />
                ))}
            </div>
        </div>
    )
}