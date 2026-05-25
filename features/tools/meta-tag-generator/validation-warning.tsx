import { icons } from "@/components/icons"
import { ValidationWarning } from "./get-validation-warning"

interface ValidationWarningsProps {
    warnings: ValidationWarning[]
}

const severityConfig = {
    error: {
        icon: icons.cross,
        bg: 'bg-red-500/10',
        border: 'border-red-500/30',
        text: 'text-red-400',
        dot: 'bg-red-500',
    },
    warning: {
        icon: icons.caution,
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/30',
        text: 'text-amber-400',
        dot: 'bg-amber-500',
    },
    info: {
        icon: icons.info,
        bg: 'bg-sky-500/10',
        border: 'border-sky-500/30',
        text: 'text-sky-400',
        dot: 'bg-sky-500',
    },
}

const ValidationWarnings = ({ warnings }: ValidationWarningsProps) => {
    if (warnings.length === 0) {
        return (
            <div className='flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-400'>
                <span>{icons.tik}</span>
                <span>All fields look good!</span>
            </div>
        )
    }

    const errors = warnings.filter(w => w.severity === 'error')
    const warningsList = warnings.filter(w => w.severity === 'warning')
    const infos = warnings.filter(w => w.severity === 'info')

    return (
        <div className='space-y-2'>
            <div className='flex items-center gap-3 text-xs text-zinc-400'>
                <span className='font-semibold uppercase tracking-wider'>Validation</span>
                {errors.length > 0 && (
                    <span className='flex items-center gap-1'>
                        <span className='h-1.5 w-1.5 rounded-full bg-red-500' />
                        {errors.length} error{errors.length > 1 ? 's' : ''}
                    </span>
                )}
                {warningsList.length > 0 && (
                    <span className='flex items-center gap-1'>
                        <span className='h-1.5 w-1.5 rounded-full bg-amber-500' />
                        {warningsList.length} warning{warningsList.length > 1 ? 's' : ''}
                    </span>
                )}
                {infos.length > 0 && (
                    <span className='flex items-center gap-1'>
                        <span className='h-1.5 w-1.5 rounded-full bg-sky-500' />
                        {infos.length} tip{infos.length > 1 ? 's' : ''}
                    </span>
                )}
            </div>

            <div className='space-y-1.5'>
                {warnings.map((w, i) => {
                    const cfg = severityConfig[w.severity]
                    return (
                        <div
                            key={i}
                            className={`flex items-start gap-2.5 rounded-lg border px-3 py-2 text-sm ${cfg.bg} ${cfg.border}`}
                        >
                            <span className={`mt-0.5 font-bold ${cfg.text}`}>{cfg.icon}</span>
                            <div>
                                <span className={`font-semibold ${cfg.text}`}>{w.field}: </span>
                                <span className='text-zinc-300'>{w.message}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ValidationWarnings