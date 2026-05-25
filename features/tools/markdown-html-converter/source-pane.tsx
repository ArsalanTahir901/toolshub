import { ViewMode } from "@/utils/markdown-to-html"
import { RefAttributes, TextareaHTMLAttributes } from "react"

interface Props {
    viewMode: ViewMode
    isMdMode: boolean
    textareaRef: RefAttributes<HTMLTextAreaElement>['ref']
    textareaValue: string;
    textareaOnChange: TextareaHTMLAttributes<HTMLTextAreaElement>['onChange']
    showEditor:boolean
}

export const SourcePane = ({ viewMode, isMdMode, textareaRef, textareaOnChange, textareaValue, showEditor }: Props) => {

    if(!showEditor) return null;

    const textareaPlaceholder = isMdMode
        ? "Start writing Markdown…"
        : "Paste HTML here to convert to Markdown…"

    return (
        <div
            className={`flex flex-col min-h-0 ${viewMode === "split" ? "w-1/2 border-r border-(--border)" : "w-full"}`}
        >
            {/* Pane label */}
            <div className="sticky top-0 flex items-center gap-2 px-4 py-2 border-b border-(--border) bg-(--card)/80 backdrop-blur-sm z-10">
                <span className="text-xs text-(--muted)">
                    {isMdMode ? "Markdown" : "HTML input"}
                </span>
                <span
                    className="size-1.5 rounded-full bg-blue-400"
                    aria-hidden="true"
                />
            </div>

            <label className="sr-only" htmlFor="md-editor">
                {isMdMode ? "Markdown editor" : "HTML input"}
            </label>
            <textarea
                id="md-editor"
                ref={textareaRef}
                value={textareaValue}
                onChange={textareaOnChange}
                spellCheck={false}
                aria-label={isMdMode ? "Markdown editor" : "HTML input"}
                aria-multiline="true"
                aria-describedby="md-editor-shortcuts"
                placeholder={textareaPlaceholder}
                className="flex-1 rounded-none! w-full resize-none bg-transparent px-5 py-4 text-sm font-mono leading-relaxed text-foreground placeholder:text-(--muted) outline-none min-h-105"
            />
            <p id="md-editor-shortcuts" className="sr-only">
                {isMdMode
                    ? "Keyboard shortcuts: Ctrl+B bold, Ctrl+I italic, Ctrl+S save"
                    : "Paste HTML to convert it to Markdown"
                }
            </p>
        </div>
    )
}