import { Label } from "@/components/label"
import { TextareaHTMLAttributes } from "react"

interface Props {
    textA: string
    textB: string
    onTextAChange: TextareaHTMLAttributes<HTMLTextAreaElement>['onChange']
    onTextBChange: TextareaHTMLAttributes<HTMLTextAreaElement>['onChange']
}

export const InputPanels = ({ textA, onTextAChange, onTextBChange, textB }: Props) => {
    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Text A */}
            <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                    <Label
                        htmlFor="diff-a"
                        className="font-medium flex items-center gap-1.5"
                    >
                        <span className="size-2 rounded-full bg-red-400" aria-hidden="true" />
                        Original
                    </Label>
                    <span className="text-xs text-(--muted)">
                        {textA.split("\n").length} lines
                    </span>
                </div>
                <textarea
                    id="diff-a"
                    value={textA}
                    onChange={onTextAChange}
                    placeholder="Paste original text here…"
                    aria-label="Original text"
                    spellCheck={false}
                    rows={10}
                    className="w-full resize-y! px-3 py-2.5 text-sm font-mono min-h-40"
                />
            </div>

            {/* Text B */}
            <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                    <Label
                        htmlFor="diff-b"
                        className="font-medium flex items-center gap-1.5"
                    >
                        <span className="size-2 rounded-full bg-green-400" aria-hidden="true" />
                        Modified
                    </Label>
                    <span className="text-xs text-(--muted)">
                        {textB.split("\n").length} lines
                    </span>
                </div>
                <textarea
                    id="diff-b"
                    value={textB}
                    onChange={onTextBChange}
                    placeholder="Paste modified text here…"
                    aria-label="Modified text"
                    spellCheck={false}
                    rows={10}
                    className="w-full resize-y! px-3 py-2.5 text-sm font-mono min-h-40"
                />
            </div>
        </div>
    )
} 