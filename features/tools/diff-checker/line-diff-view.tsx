import { JSX } from "react";
import { LineNum } from "./line-num";
import { InlineParts } from "./inline-parts";
import { LineDiff } from "@/utils/diff-checker";

interface Props {
    lineDiff: never[] | LineDiff[]
    visible: boolean
}

export const LineDiffView = ({ lineDiff, visible }: Props) => {

    if (!visible) return null

    return (
        <div
            role="region"
            aria-label="Line diff result"
            className="w-full rounded-xl border border-(--border) overflow-hidden"
        >
            {/* Header */}
            <div className="grid grid-cols-2 border-b border-(--border) bg-(--muted)/5">
                <div className="flex items-center gap-2 px-3 py-2 text-xs text-(--muted) border-r border-(--border)">
                    <span className="size-2 rounded-full bg-red-400" />
                    Original
                </div>
                <div className="flex items-center gap-2 px-3 py-2 text-xs text-(--muted)">
                    <span className="size-2 rounded-full bg-green-400" />
                    Modified
                </div>
            </div>

            {/* Side-by-side diff rows */}
            <div className="overflow-x-auto max-h-120 overflow-y-auto">
                {(() => {
                    // Group into pairs for side-by-side
                    const rows: JSX.Element[] = [];
                    let i = 0;
                    while (i < lineDiff.length) {
                        const curr = lineDiff[i];
                        const next = lineDiff[i + 1];

                        if (curr.type === "delete" && next?.type === "insert") {
                            // Changed pair
                            rows.push(
                                <div key={i} className="grid grid-cols-2 border-b border-(--border)/50 last:border-0">
                                    <div className="flex items-start bg-red-500/8 border-r border-(--border)">
                                        <LineNum n={curr.lineNum} />
                                        <span className="flex-1 px-3 py-1 text-xs font-mono leading-6 break-all text-red-200 whitespace-pre-wrap">
                                            {curr.parts ? <InlineParts parts={curr.parts} /> : curr.value}
                                        </span>
                                    </div>
                                    <div className="flex items-start bg-green-500/8">
                                        <LineNum n={next.lineNumB} />
                                        <span className="flex-1 px-3 py-1 text-xs font-mono leading-6 break-all text-green-200 whitespace-pre-wrap">
                                            {next.parts ? <InlineParts parts={next.parts} /> : next.value}
                                        </span>
                                    </div>
                                </div>
                            );
                            i += 2;
                        } else if (curr.type === "delete") {
                            rows.push(
                                <div key={i} className="grid grid-cols-2 border-b border-(--border)/50 last:border-0">
                                    <div className="flex items-start bg-red-500/8 border-r border-(--border)">
                                        <LineNum n={curr.lineNum} />
                                        <span className="flex-1 px-3 py-1 text-xs font-mono leading-6 break-all text-red-300 whitespace-pre-wrap">
                                            {curr.value}
                                        </span>
                                    </div>
                                    <div className="bg-(--muted)/3 border-r border-(--border)" />
                                </div>
                            );
                            i++;
                        } else if (curr.type === "insert") {
                            rows.push(
                                <div key={i} className="grid grid-cols-2 border-b border-(--border)/50 last:border-0">
                                    <div className="bg-(--muted)/3 border-r border-(--border)" />
                                    <div className="flex items-start bg-green-500/8">
                                        <LineNum n={curr.lineNumB} />
                                        <span className="flex-1 px-3 py-1 text-xs font-mono leading-6 break-all text-green-300 whitespace-pre-wrap">
                                            {curr.value}
                                        </span>
                                    </div>
                                </div>
                            );
                            i++;
                        } else {
                            // Equal
                            rows.push(
                                <div key={i} className="grid grid-cols-2 border-b border-(--border)/50 last:border-0 opacity-50 hover:opacity-100 transition-opacity">
                                    <div className="flex items-start border-r border-(--border)">
                                        <LineNum n={curr.lineNum} />
                                        <span className="flex-1 px-3 py-1 text-xs font-mono leading-6 break-all text-(--muted) whitespace-pre-wrap">
                                            {curr.value}
                                        </span>
                                    </div>
                                    <div className="flex items-start">
                                        <LineNum n={curr.lineNumB} />
                                        <span className="flex-1 px-3 py-1 text-xs font-mono leading-6 break-all text-(--muted) whitespace-pre-wrap">
                                            {curr.value}
                                        </span>
                                    </div>
                                </div>
                            );
                            i++;
                        }
                    }
                    return rows;
                })()}
            </div>
        </div>
    )
}