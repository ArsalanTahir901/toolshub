import { Label } from "@/components/label"
import { CalcMode, ModeConfig } from "@/utils/percentage-calculator"
import { InputHTMLAttributes } from "react";

interface Props {
    currentMode: ModeConfig
    inputA: string;
    onInputAChange: InputHTMLAttributes<HTMLInputElement>['onChange']
    inputB: string;
    onInputBChange: InputHTMLAttributes<HTMLInputElement>['onChange']
    calc: () => void
    mode: CalcMode
}

export const Inputs = ({ currentMode, inputA, onInputAChange, calc, mode, inputB, onInputBChange }: Props) => {

    const operator = () => {
        if (mode === "percentChange") return '→';
        if (mode === "addPercent") return '+';
        if (mode === "subtractPercent") return '-';
        return 'of'
    }
    return (
        <div className="flex gap-2 items-end mb-2 flex-wrap">
            {/* Input A */}
            <div className="flex-1">
                <Label htmlFor="inputA">{currentMode.inputA}</Label>
                <input
                    id="inputA"
                    type="number"
                    value={inputA}
                    onChange={onInputAChange}
                    placeholder={currentMode.placeholder[0]}
                    aria-label={currentMode.inputA}
                    onKeyDown={(e) => e.key === "Enter" && calc()}
                />
            </div>

            {/* Operator badge */}
            <div className="mb-2 text-sm text-(--muted) font-mono px-1 shrink-0">
                {operator()}
            </div>

            {/* Input B */}
            <div className="flex-1">
                <Label htmlFor="inputB">{currentMode.inputB}</Label>
                <input
                    id="inputB"
                    type="number"
                    value={inputB}
                    onChange={onInputBChange}
                    placeholder={currentMode.placeholder[1]}
                    aria-label={currentMode.inputB}
                    onKeyDown={(e) => e.key === "Enter" && calc()}
                />
            </div>
        </div>
    )
}