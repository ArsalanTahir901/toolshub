import { Button } from "@/components/buttons"
import { icons } from "@/components/icons";
import { Label } from "@/components/label"
import { InputHTMLAttributes } from "react";

interface Props {
    value: string;
    onChange: InputHTMLAttributes<HTMLInputElement>['onChange'];
    doReplace: () => void;
    disableReplaceBtn: boolean;
    replaced: string
    copyReplaced: () => void
}

export const ReplaceSection = ({ copyReplaced, disableReplaceBtn, doReplace, onChange, replaced, value }: Props) => {
    return (
        <div className="w-full flex flex-col gap-2 mb-2">
            <Label htmlFor="regex-replace">
                Replace with <span className="text-(--muted)/60">(supports $1, $2, $&, named groups)</span>
            </Label>
            <div className="flex gap-2">
                <input
                    id="regex-replace"
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder="Replacement string…"
                    aria-label="Replace with"
                    className="flex-1 rounded-xl border border-(--border) bg-(--card) px-3 py-2 text-sm font-mono text-foreground outline-none focus:ring-1 focus:ring-(--ring) placeholder:text-(--muted)"
                />
                <Button variant="glow" onClick={doReplace} disabled={disableReplaceBtn}>
                    Replace
                </Button>
            </div>

            {replaced && (
                <div className="w-full flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-(--muted)">Result</span>
                        <Button onClick={copyReplaced} className="text-xs px-2 py-1">
                            {icons.copy} Copy result
                        </Button>
                    </div>
                    <pre className="w-full rounded-xl border border-(--border) bg-(--card) p-3 text-sm font-mono text-foreground break-all whitespace-pre-wrap max-h-40 overflow-y-auto">
                        {replaced}
                    </pre>
                </div>
            )}
        </div>
    )
}