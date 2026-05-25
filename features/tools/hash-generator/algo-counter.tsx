interface Props {
    selectedLength: number;
    resultLength: number;
}

export const AlgoCounter = ({ resultLength, selectedLength }: Props) => {
    return (
        <div className="w-full flex items-center gap-3 my-3 text-xs text-(--muted)">
            <span>
                {selectedLength} algorithm
                {selectedLength !== 1 ? "s" : ""} selected
            </span>

            {resultLength > 0 && (
                <>
                    <span>·</span>
                    <span>
                        {resultLength} hash
                        {resultLength !== 1 ? "es" : ""} generated
                    </span>
                </>
            )}
        </div>
    )
}