import { ErrorMsg } from "@/components/error-msg"
import { Label } from "@/components/label"
import { RegexFlag } from "@/utils/regex-tester"
import { InputHTMLAttributes } from "react"

interface Props {
    error: string
    value: string
    onChange: InputHTMLAttributes<HTMLInputElement>['onChange']
    flags: RegexFlag[]
}

export const RegexPatternInput = ({ error, onChange, value, flags }: Props) => {
    return (
        <div className="w-full flex flex-col gap-1.5 mb-2">
            <Label htmlFor="regex-pattern">
                Regular Expression
            </Label>
            <div className="flex items-center gap-0 w-full rounded-lg border border-(--border) bg-(--card) overflow-hidden focus-within:border focus-within:border-(--accent)">
                <span className="px-3 text-(--muted) text-sm font-mono select-none">/</span>
                <input
                    id="regex-pattern"
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder="[a-z]+"
                    spellCheck={false}
                    aria-label="Regex pattern"
                    className="bg-transparent! border-0! focus:border-0!"
                />
                <span className="px-3 text-(--muted) text-sm font-mono select-none">
                    /{[...flags].join("")}
                </span>
            </div>

            <ErrorMsg error={error} />
        </div>
    )
}