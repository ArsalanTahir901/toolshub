import { Button } from "@/components/buttons";
import { ErrorMsg } from "@/components/error-msg";
import { icons } from "@/components/icons";
import { Label } from "@/components/label";
import { InputHTMLAttributes } from "react";

interface Props {
    value: string;
    onChange: InputHTMLAttributes<HTMLInputElement>['onChange']
    isValid: boolean
    error: string
    onCopy: () => void;
}

export const CronInput = ({ error, isValid, onChange, value, onCopy }: Props) => {
    return (
        <div className="w-full flex flex-col gap-1.5 mb-3">
            <Label htmlFor="cron-input">
                Cron expression
                <span className="ml-2 text-(--muted)/60">
                    minute · hour · day · month · weekday
                </span>
            </Label>
            <div className="flex gap-2">
                <input
                    id="cron-input"
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder="* * * * *"
                    spellCheck={false}
                    aria-label="Cron expression"
                    aria-invalid={!isValid}
                    aria-describedby={error ? "cron-error" : undefined}
                    className={`${isValid ? "border-(--border)" : "border-red-500/40 focus:ring-red-500/30"}`}
                />
                <Button onClick={onCopy} title="Copy" aria-label="Copy expression">
                    {icons.copy}
                </Button>
            </div>

            {/* Error */}
            <ErrorMsg error={isValid ? error : ''} />
        </div>
    )
}