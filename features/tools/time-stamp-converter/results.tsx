import { Button } from "@/components/buttons"
import { OutputRow } from "./output-row"
import { icons } from "@/components/icons"

interface Props {
    copyAll: () => void
    copyValue: (val: string) => void
    clear: () => void
    result: {
        relative: string;
        unix: number;
        unixMs: number;
        utc: string;
        local: string;
        iso8601: string;
        date: string;
        localDate: string;
        time: string;
        localTime: string;
        dayOfWeek: string;
        localDayOfWeek: string;
        weekNumber: number;
        isLeapYear: boolean;
        timezone: string;
    } | null
}

export const Results = ({ clear, copyAll, result, copyValue }: Props) => {

    if (!result) return null;

    return (
        <div className="w-full flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <span className="text-xs text-(--muted)">Results</span>
                <div className="flex gap-2">
                    <Button onClick={copyAll} className="text-xs px-2 py-1">
                        {icons.copy} Copy all
                    </Button>
                    <Button onClick={clear} className="text-xs px-2 py-1">
                        {icons.bin}
                    </Button>
                </div>
            </div>

            <OutputRow label="Unix (s)" value={result.unix} onCopy={copyValue} />
            <OutputRow label="Unix (ms)" value={result.unixMs} onCopy={copyValue} />
            <OutputRow label="ISO 8601" value={result.iso8601} onCopy={copyValue} />
            <OutputRow label="UTC" value={result.utc} onCopy={copyValue} />
            <OutputRow label="Local" value={result.local} onCopy={copyValue} mono={false} />
            <OutputRow label="Date (UTC)" value={result.date} onCopy={copyValue} />
            <OutputRow label="Time (UTC)" value={result.time} onCopy={copyValue} />
            <OutputRow label="Day" value={result.dayOfWeek} onCopy={copyValue} mono={false} />
            <OutputRow label="Week No." value={result.weekNumber} onCopy={copyValue} />

            {/* Extras row */}
            <div className="flex gap-2 mt-1">
                <span className={`text-xs px-2.5 py-1 rounded-full border ${result.isLeapYear
                    ? "border-green-500/30 bg-green-500/10 text-green-400"
                    : "border-(--border) text-(--muted)"
                    }`}>
                    {result.isLeapYear ? "✓ Leap year" : "✗ Not a leap year"}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full border border-(--border) text-(--muted)">
                    {result.timezone}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400">
                    {result.relative}
                </span>
            </div>
        </div>
    )
}