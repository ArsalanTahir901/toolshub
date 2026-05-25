import { icons } from "@/components/icons"

export const OutputRow = ({
    label,
    value,
    mono = true,
    onCopy,
}: {
    label: string
    value: string | number
    mono?: boolean
    onCopy: (v: string) => void
}) => (
    <div className="flex items-center gap-3 w-full rounded-xl border border-(--border) bg-(--card) px-3 py-2.5">
        <span className="text-xs font-medium text-(--muted) w-24 shrink-0">{label}</span>
        <span className={`flex-1 text-sm text-foreground truncate ${mono ? "font-mono" : ""}`}>
            {String(value)}
        </span>
        <button
            onClick={() => onCopy(String(value))}
            className="cursor-pointer shrink-0 text-xs text-(--muted) hover:text-foreground transition-colors"
            aria-label={`Copy ${label}`}
        >
            {icons.copy} Copy
        </button>
    </div>
)