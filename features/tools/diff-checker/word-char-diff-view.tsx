import { DiffMode, DiffPart } from "@/utils/diff-checker"
import { InlineParts } from "./inline-parts"

interface Props {
    parts: DiffPart[]
    mode: DiffMode
}

export const WordCharDiffView = ({ mode, parts }: Props) => {

    if (mode == 'lines') return null;

    return (
        <div
            role="region"
            aria-label={`${mode === "words" ? "Word" : "Character"} diff result`}
            className="w-full rounded-xl border border-(--border) bg-(--card) p-4 max-h-96 overflow-y-auto"
        >
            <p className="text-sm font-mono leading-loose break-all whitespace-pre-wrap">
                <InlineParts parts={parts} />
            </p>
        </div>
    )
}