import { ViewMode } from "@/utils/markdown-to-html"
import { RefAttributes } from "react"
import './md-preview.css';

interface Props {
    viewMode: ViewMode
    isMdMode: boolean
    previewRef: RefAttributes<HTMLDivElement>['ref']
    renderedHtml: string
    convertedMd: string
    showPreview: boolean
}

export const OutputPane = ({ showPreview, viewMode, isMdMode, previewRef, renderedHtml, convertedMd }: Props) => {
    if (!showPreview) return null

    return (
        <div className={`flex flex-col min-h-0 overflow-y-auto ${viewMode === "split" ? "w-1/2" : "w-full"}`}>
            {/* Pane header */}
            <div className="sticky top-0 flex items-center gap-2 px-4 py-2 border-b border-(--border) bg-(--card)/80 backdrop-blur-sm z-10">
                <span className="text-xs text-(--muted)">
                    {isMdMode ? "Preview" : "Converted Markdown"}
                </span>
                <span
                    className="size-1.5 rounded-full bg-green-400 animate-pulse"
                    aria-hidden="true"
                />
            </div>

            {/* MD→HTML: rendered preview */}
            {isMdMode ? (
                <article
                    ref={previewRef}
                    aria-label="Rendered markdown preview"
                    aria-live="polite"
                    aria-atomic="true"
                    className="md-preview flex-1 px-6 py-5 min-h-105 overflow-x-hidden"
                    dangerouslySetInnerHTML={{ __html: renderedHtml }}
                />
            ) : (
                /* HTML→MD: converted markdown as plain monospace text */
                <div
                    ref={previewRef}
                    aria-label="Converted Markdown output"
                    aria-live="polite"
                    aria-atomic="true"
                    className="flex-1 min-h-105"
                >
                    {convertedMd ? (
                        <pre className="px-5 py-4 m-0 text-sm font-mono leading-relaxed text-foreground whitespace-pre-wrap wrap-break-word border-none outline-none bg-transparent">
                            {convertedMd}
                        </pre>
                    ) : (
                        <p className="px-5 py-4 text-sm text-(--muted) italic">
                            Paste HTML in the source pane to see converted Markdown here.
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}