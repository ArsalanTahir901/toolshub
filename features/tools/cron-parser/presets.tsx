import { Tab } from "@/components/tab"
import { PRESETS } from "@/utils/cron-parser"

interface Props {
    loadPreset: (expr: string) => void
    expr: string
}

export const Presets = ({ expr, loadPreset }: Props) => {
    return (
        <div className="flex flex-col gap-2 w-full mb-3">
            <span className="text-xs text-(--muted)">Common presets</span>
            <Tab
                data={PRESETS.map((p) => ({
                    label: p.label,
                    value: p.expr,
                    title: `${p.desc} - ${p.expr}`
                }))}
                activeVal={expr}
                onClick={loadPreset}
            />
        </div>
    )
}