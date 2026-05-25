interface CharacterCountProps {
    current: number
    min?: number
    max: number
}

const CharacterCount = ({ current, min, max, }: CharacterCountProps) => {
    const percentage = (current / max) * 100

    const getStatus = () => {
        if (current === 0) return 'empty'
        if (min && current < min) return 'short'
        if (current >= max) return 'over'
        if (current >= max * 0.9) return 'warning'
        return 'good'
    }

    const status = getStatus()

    const statusConfig = {
        empty: { color: 'text-zinc-500', bar: 'bg-zinc-600', label: 'Empty' },
        short: { color: 'text-amber-400', bar: 'bg-amber-400', label: `Too short (min ${min})` },
        good: { color: 'text-emerald-400', bar: 'bg-emerald-400', label: 'Good length' },
        warning: { color: 'text-amber-400', bar: 'bg-amber-400', label: 'Approaching limit' },
        over: { color: 'text-red-400', bar: 'bg-red-500', label: 'At limit' },
    }

    const config = statusConfig[status]

    return (
        <div className='mt-1.5 space-y-1'>
            <div className='flex items-center justify-between text-xs'>
                <span className={`font-medium ${config.color}`}>{config.label}</span>
                <span className={`font-mono ${config.color}`}>
                    {current}/{max}
                </span>
            </div>
            <div className='h-1 w-full overflow-hidden rounded-full bg-zinc-800'>
                <div
                    className={`h-full rounded-full transition-all duration-300 ${config.bar}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                />
            </div>
        </div>
    )
}

export default CharacterCount