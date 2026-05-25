import { Button } from "@/components/buttons"
import { icons } from "@/components/icons";
import { Label } from "@/components/label";
import { DiffMode } from "@/utils/diff-checker"

interface Props {
    mode: DiffMode,
    inline: boolean
    setInline: (val: boolean) => void;
    swap: () => void
    clear: () => void
}

export const Toggles = ({ inline, mode, setInline, clear, swap }: Props) => {
    return (
        <div className="flex items-center gap-3">
            {mode === "lines" && (
                <Label htmlFor="inline" className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                        id='inline'
                        type="checkbox"
                        checked={inline}
                        onChange={(e) => setInline(e.target.checked)}
                        // className="accent-violet-500 size-3.5"
                        aria-label="Show inline character diff"
                    />
                    Inline diff
                </Label>
            )}

            {/* Action buttons */}
            <Button onClick={swap} title="Swap A and B" aria-label="Swap texts">
                {icons.swap} Swap
            </Button>
            <Button onClick={clear} aria-label="Clear both inputs">
                {icons.bin}
            </Button>
        </div>
    )
}