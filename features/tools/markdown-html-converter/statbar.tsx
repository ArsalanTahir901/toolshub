export const StatsBar = ({
    words, chars, lines, readTime,
}: {
    words: number; chars: number; lines: number; readTime: string
}) => (
    <div
        role="status"
        aria-live="polite"
        aria-label="Document statistics"
        className="flex items-center gap-3 text-xs text-(--muted) select-none"
    >
        <span>{words.toLocaleString()} words</span>
        <span aria-hidden="true">·</span>
        <span>{chars.toLocaleString()} chars</span>
        <span aria-hidden="true">·</span>
        <span>{lines.toLocaleString()} lines</span>
        <span aria-hidden="true">·</span>
        <span>{readTime}</span>
    </div>
)