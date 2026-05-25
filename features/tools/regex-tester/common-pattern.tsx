import { Button } from "@/components/buttons"
import { Label } from "@/components/label";
import { COMMON_PATTERNS } from "@/utils/regex-tester"

interface Props {
    loadPattern: (newPattern: string, patternFlags: string) => void;
    pattern: string;
}

export const CommonPattern = ({ loadPattern, pattern }: Props) => {
    return (
        <div className="flex flex-col gap-2 w-full mb-2">
            <Label htmlFor="patterns">Common patterns</Label>
            <div id='patterns' className="flex flex-wrap gap-1.5">
                {COMMON_PATTERNS.map((p) => (
                    <Button
                        key={p.label}
                        onClick={() => loadPattern(p.pattern, p.flags)}
                        className="px-2.5 py-1 text-xs"
                        isActive={p.pattern === pattern}
                    >
                        {p.label}
                    </Button>
                ))}
            </div>
        </div>
    )
}