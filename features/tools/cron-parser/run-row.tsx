export const RunRow = ({ date, index }: { date: Date; index: number }) => {
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffMins = Math.round(diffMs / 60000);
    const relative =
        diffMins < 60
            ? `in ${diffMins}m`
            : diffMins < 1440
                ? `in ${Math.round(diffMins / 60)}h`
                : `in ${Math.round(diffMins / 1440)}d`;

    return (
        <div className={`
            flex items-center gap-3 px-3 py-2 rounded-lg
            border border-(--border)
            ${index === 0 ? "bg-violet-500/8 border-violet-500/20" : "bg-(--card)"}
        `}>
            <span className={`
                shrink-0 text-xs font-medium tabular-nums w-5 text-center
                ${index === 0 ? "text-violet-400" : "text-(--muted)"}
            `}>
                {index + 1}
            </span>
            <span className="flex-1 text-sm font-mono text-foreground">
                {date.toLocaleString()}
            </span>
            <span className={`
                shrink-0 text-xs px-2 py-0.5 rounded-full
                ${index === 0
                    ? "bg-violet-500/15 text-violet-300 border border-violet-500/20"
                    : "text-(--muted)"
                }
            `}>
                {relative}
            </span>
        </div>
    );
};