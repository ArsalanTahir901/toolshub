export const Divider = ({ title }: { title?: string }) => {
    return (
        <div className="w-full flex items-center gap-3 my-3">
            <div className="flex-1 h-px bg-(--border)" />
            {title && <span className="text-xs text-(--muted)">{title}</span>}
            <div className="flex-1 h-px bg-(--border)" />
        </div>
    )
}