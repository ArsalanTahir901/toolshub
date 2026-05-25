type IsValid = boolean | null

type Stats = {
    size: number;
    lines: number;
    keys: number;
} | null

interface Props {
    isValid: IsValid
    stats: Stats
}

export const ValidBadge = ({ isValid }: { isValid: IsValid }) => {
    if (isValid === null) return null;
    return (
        <span
            className={`
                inline-flex items-center gap-1.5
                rounded-full px-2.5 py-0.5
                text-xs font-medium
                ${isValid
                    ? "bg-green-500/10 text-green-400 border border-green-500/20"
                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                }
            `}
        >
            <span className={`size-1.5 rounded-full ${isValid ? "bg-green-400" : "bg-red-400"}`} />
            {isValid ? "Valid JSON" : "Invalid JSON"}
        </span>
    )
}

export const ValidityBadge = ({ isValid, stats }: Props) => {
    return (
        <div className="w-full flex items-center gap-3 my-2">
            <ValidBadge isValid={isValid} />
            {/* Stats row */}
            {stats && (
                <div className="flex items-center gap-3 text-xs text-(--muted)">
                    <span>{stats.lines.toLocaleString()} lines</span>
                    <span>·</span>
                    <span>{stats.keys.toLocaleString()} keys</span>
                    <span>·</span>
                    <span>{stats.size < 1024
                        ? `${stats.size} B`
                        : `${(stats.size / 1024).toFixed(1)} KB`}
                    </span>
                </div>
            )}
        </div>
    )
}