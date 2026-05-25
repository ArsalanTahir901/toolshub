export const ResultSkeleton = () => (
    <div className="flex flex-col gap-2 w-full py-1" aria-label="Processing…">
        <div className="h-3 w-3/4 rounded-full bg-(--muted)/20 animate-pulse" />
        <div className="h-3 w-full  rounded-full bg-(--muted)/20 animate-pulse" />
        <div className="h-3 w-2/3  rounded-full bg-(--muted)/20 animate-pulse" />
    </div>
)