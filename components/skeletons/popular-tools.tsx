import { ToolCardSkeleton } from "./tool-card"

export const PopularToolsSkeleton = () => {
    return (
        <div className="grid grid-cols-1 min-[640px]:grid-cols-2 xl:grid-cols-3 gap-5">
            {[1, 2, 3].map(num => (
                <ToolCardSkeleton key={num} />
            ))}
        </div>
    )
}