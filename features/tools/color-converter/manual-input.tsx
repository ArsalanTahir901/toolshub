import { ColorFormat } from "@/utils/color-converter"
import { InputHTMLAttributes } from "react";

const placeholder: Record<ColorFormat, string> = {
    hex: "#3b82f6 or 3b82f6",
    rgb: "59, 130, 246",
    hsl: "217, 91%, 60%",
    hsv: "217, 76%, 96%",
    cmyk: "76%, 47%, 0%, 4%",
}

interface Props {
    value: string;
    onChange: InputHTMLAttributes<HTMLInputElement>['onChange']
    inputFormat: ColorFormat
}

export const ManualInput = ({ inputFormat, onChange, value }: Props) => {
    return (
        <div className="my-2">
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder[inputFormat]}
                aria-label={`Enter ${inputFormat.toUpperCase()} color value`}
                spellCheck={false}
            />
        </div>
    )
}