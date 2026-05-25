export const LineNum = ({ n }: { n: number | null }) => {
    if (n === null) return null

    return (
        <span
            className="select-none text-right w-10 shrink-0 text-(--muted) text-xs leading-6 pr-3 border-r border-(--border)"
            aria-hidden="true"
        >
            {n}
        </span>
    )
}