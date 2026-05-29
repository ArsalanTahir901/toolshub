import { ParseResult } from "@/utils/cron-parser";

interface Props {
    result: ParseResult
}

export const FieldPill = ({ result }: Props) => {

    if (!result.valid && !result.fields.length) return null;

    return (
        <div
            role="group"
            aria-label="Cron fields breakdown"
            className="w-full grid grid-cols-5 gap-2 mb-3"
        >
            {result.fields.map(({ value, desc, valid }, i) => (
                <div key={value + i} className={`
        flex flex-col gap-1 rounded-xl border px-3 py-2.5 min-w-0
        ${valid
                        ? "border-(--border) bg-(--card)"
                        : "border-red-500/30 bg-red-500/5"
                    }
    `}>
                    {/* <span className="text-[10px] font-medium uppercase tracking-wider text-(--muted)">
                        {name}
                    </span> */}
                    <span className={`text-lg font-mono font-bold tabular-nums ${valid ? "text-foreground" : "text-red-400"}`}>
                        {value}
                    </span>
                    <span className={`text-xs truncate ${valid ? "text-violet-400" : "text-red-400"}`}>
                        {desc}
                    </span>
                </div>
            ))}
        </div>
    )
}