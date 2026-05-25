import { Label } from "@/components/label";
import { INDENT_OPTIONS, IndentValue } from "@/hooks/useJsonFormatter";
import { SelectHTMLAttributes } from "react";

interface Props {
    value: IndentValue;
    onChange: SelectHTMLAttributes<HTMLSelectElement>['onChange']
}

export const IndentSelector = ({ onChange, value }: Props) => {
    return (
        <div className="flex items-center gap-3 mb-3">
            <Label htmlFor="json-indent" className="shrink-0">
                Indent:
            </Label>
            <div>
                <select
                    id="json-indent"
                    value={value}
                    onChange={onChange}
                    aria-label="Indentation style"
                    className="w-20"
                >
                    {INDENT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}