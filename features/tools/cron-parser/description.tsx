interface Props {
    description: string
    visible: boolean
}

export const Description = ({ description, visible }: Props) => {
    if (!visible) return null
    return (
        <div className="mb-3 w-full rounded-xl border border-violet-500/20 bg-violet-500/5 px-4 py-3">
            <p className="text-xs text-(--muted) mb-1">Description</p>
            <p className="text-sm font-medium text-violet-200">
                {description}
            </p>
        </div>
    )
}