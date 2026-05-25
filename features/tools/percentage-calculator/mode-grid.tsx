import { Button } from "@/components/buttons";
import { CalcMode, MODES } from "@/utils/percentage-calculator"

interface Props {
    onModeChange: (val: CalcMode) => void;
    mode: CalcMode
}

export const ModeGrid = ({ onModeChange, mode }: Props) => {
    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
            {MODES.map((m) => (
                <Button
                    key={m.value}
                    onClick={() => onModeChange(m.value as CalcMode)}
                    isActive={mode === m.value}
                    className={`flex flex-col gap-0.5 text-left transition-all duration-200`}
                >
                    <span className="text-base">{m.icon}</span>
                    <span className="text-xs font-medium leading-tight">{m.label}</span>
                    <span className="text-[10px] opacity-60 leading-tight">{m.desc}</span>
                </Button>
            ))}
        </div>
    )
}