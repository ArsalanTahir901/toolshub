import { Button } from "@/components/buttons"
import { Label } from "@/components/label"
import { InputHTMLAttributes } from "react";

interface Props {
    dateInput: string;
    onDateInputChange: InputHTMLAttributes<HTMLInputElement>['onChange']
    convertDate: () => void
}

export const DateToTimeStamp = ({ convertDate, dateInput, onDateInputChange }: Props) => {
    return (
        <div className="mb-3">
            <Label htmlFor="date-to-timestamp">Date / ISO string → Unix</Label>
            <div className="flex gap-2 flex-wrap">
                <input
                    id='date-to-timestamp'
                    type="text"
                    value={dateInput}
                    onChange={onDateInputChange}
                    placeholder="2024-05-17 or 2024-05-17T10:30:00Z"
                    aria-label="Date string input"
                    className="flex-1"
                    onKeyDown={(e) => e.key === "Enter" && convertDate()}
                />
                <Button variant="glow" onClick={convertDate}>
                    Convert
                </Button>
            </div>
        </div>
    )
}