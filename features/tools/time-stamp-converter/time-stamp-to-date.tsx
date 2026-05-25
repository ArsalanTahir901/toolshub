import { Button } from "@/components/buttons";
import { Label } from "@/components/label"
import { InputHTMLAttributes, SelectHTMLAttributes } from "react";

interface Props {
    tsInput: string;
    onTsInputChange: InputHTMLAttributes<HTMLInputElement>['onChange']
    convertTimestamp: () => void;
    unit: string;
    onUnitChange: SelectHTMLAttributes<HTMLSelectElement>['onChange']
}

export const TimeStampToDate = ({ onTsInputChange, tsInput, convertTimestamp, onUnitChange, unit }: Props) => {
    return (
        <div className="mb-3">
            <Label htmlFor="time-value">Unix timestamp → Date</Label>
            <div className="flex gap-2 flex-wrap">
                <input
                    id='time-value'
                    type="number"
                    value={tsInput}
                    onChange={onTsInputChange}
                    placeholder="e.g. 1716912000"
                    aria-label="Unix timestamp input"
                    className="max-w-40"
                    onKeyDown={(e) => e.key === "Enter" && convertTimestamp()}
                />
                <select
                    value={unit}
                    onChange={onUnitChange}
                    aria-label="Timestamp unit"
                    className="flex-1"
                >
                    <option value="seconds">sec</option>
                    <option value="milliseconds">ms</option>
                </select>
                <Button variant="glow" onClick={convertTimestamp}>
                    Convert
                </Button>
            </div>
        </div>
    )
}