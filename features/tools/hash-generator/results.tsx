import { Button } from "@/components/buttons"
import { icons } from "@/components/icons"
import { HashResult } from "@/utils/hash-generator"

interface Props {
    results: HashResult[]
    copyHash: (hash: string) => void
}

export const Results = ({ results, copyHash }: Props) => {
    if (!results.length) return null
    return (
        <div className="w-full flex flex-col gap-3 mt-3">
            {results.map((result) => (
                <div
                    key={result.algorithm}
                    className="w-full rounded-xl border border-(--border) bg-(--card) p-3"
                >
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">
                            {result.algorithm}
                        </span>

                        <Button
                            onClick={() =>
                                copyHash(result.hash)
                            }
                            className="text-xs px-2 py-1"
                        >
                            {icons.copy} Copy
                        </Button>
                    </div>

                    <pre className="text-xs font-mono break-all whitespace-pre-wrap text-foreground">
                        {result.hash}
                    </pre>
                </div>
            ))}
        </div>
    )
}