import { Button } from "@/components/buttons"
import { icons } from "@/components/icons";

interface Props {
    output: string;
    onCopy: () => void
}

export const Output = ({ onCopy, output }: Props) => {

    if (!output) return null;

    return (
        <div className="w-full flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <span className="text-xs text-(--muted)">Output</span>
                <Button onClick={onCopy} className="text-xs px-2 py-1">
                    {icons.copy} Copy
                </Button>
            </div>
            <pre className="w-full rounded-xl border border-(--border) bg-(--card) p-4 text-xs font-mono text-foreground overflow-x-auto max-h-96 whitespace-pre">
                {output}
            </pre>
        </div>
    )
}