import { icons } from "@/components/icons"

export const OutputRow = ({
    label,
    value,
    onCopy,
}: {
    label: string
    value: string
    onCopy: (v: string) => void
}) => (
    <div className="flex items-center gap-3 w-full rounded-xl border border-(--border) bg-(--card) px-3 py-2.5">
        <span className="text-xs font-medium text-(--muted) w-10 shrink-0">{label}</span>
        <span className="flex-1 text-sm font-mono text-foreground truncate">{value}</span>
        <button
            onClick={() => onCopy(value)}
            className="cursor-pointer shrink-0 text-sm text-(--muted) hover:text-foreground transition-colors"
            aria-label={`Copy ${label} value`}
        >
            {icons.copy} Copy
        </button>
    </div>
)