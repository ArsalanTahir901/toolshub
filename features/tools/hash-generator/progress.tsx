export const Progress = ({ progress, visible }: { visible: boolean, progress: number }) => {

    if (!visible) return null;

    return (
        <div className="w-full mb-3">
            <div className="flex justify-between text-xs text-(--muted) mb-1">
                <span>Processing...</span>
                <span>{progress}%</span>
            </div>

            <div className="w-full h-2 rounded-full bg-(--border) overflow-hidden">
                <div
                    className="h-full bg-linear-to-r from-purple-500 to-pink-500 transition-all"
                    style={{
                        width: `${progress}%`,
                    }}
                />
            </div>
        </div>
    )
}