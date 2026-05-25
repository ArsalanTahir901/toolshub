interface Props { error?: string }

export const ErrorMsg = ({ error }: Props) => {
    if (!error) return null;
    return (
        <span className="text-xs text-red-600 font-medium block mt-0.5">{error}</span>
    )
}


export const ErrorAlert = ({ error }: Props) => {
    if (!error) return null;
    return (
        <div className="w-full rounded-xl border border-red-500/20 bg-red-500/5 px-3 py-2.5 text-sm text-red-400 font-mono break-all">
            <span className="font-sans font-medium text-red-300 mr-2">Error:</span>
            {error}
        </div>
    )
}