export const StatsBadge = ({
    added, removed, same
}: {
    added: number; removed: number; same: number
}) => (
    <div className="flex items-center gap-2 text-xs" role="status" aria-live="polite">
        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
            <span aria-hidden="true">+</span>{added} added
        </span>
        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
            <span aria-hidden="true">−</span>{removed} removed
        </span>
        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-(--muted)/10 text-(--muted) border border-(--border)">
            {same} unchanged
        </span>
    </div>
)