import { Button } from "@/components/buttons";
import { icons } from "@/components/icons";
import { Label } from "@/components/label";
import { Tab } from "@/components/tab";
import { ConverterMode, ViewMode } from "@/utils/markdown-to-html";
import { InputHTMLAttributes, RefAttributes } from "react";

interface Props {
    fileName: string;
    setFileName: (val: string) => void
    isMdMode: boolean
    converterMode: ConverterMode
    setConverterMode: (val: ConverterMode) => void
    viewMode: ViewMode
    setViewMode: (val: ViewMode) => void
    openFile: () => void
    downloadMd: () => void
    downloadHtml: () => void
    copySource: () => void
    copyOutput: () => void
    isFullscreen: boolean
    toggleFullscreen: () => void
    clear: () => void
    fileInputRef: RefAttributes<HTMLInputElement>['ref']
    onFileChange: InputHTMLAttributes<HTMLInputElement>['onChange']
}

export const Topbar = ({
    fileName,
    setFileName,
    isMdMode,
    converterMode,
    setConverterMode,
    setViewMode,
    viewMode,
    openFile,
    downloadMd,
    downloadHtml,
    copySource,
    copyOutput,
    isFullscreen,
    toggleFullscreen,
    clear,
    fileInputRef,
    onFileChange
}: Props) => {

    const modes: { value: ConverterMode; label: string; title: string }[] = [
        { value: "md-to-html", label: "MD → HTML", title: "Convert Markdown to HTML" },
        { value: "html-to-md", label: "HTML → MD", title: "Convert HTML to Markdown" },
    ]

    const views: { value: ViewMode; label: string; title: string }[] = [
        { value: "source", label: "Source", title: "Source only" },
        { value: "split", label: "Split", title: "Split view" },
        { value: "preview", label: "Preview", title: "Output preview" },
    ]

    return (
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-(--border) bg-(--card)/80 backdrop-blur-sm flex-wrap">

            {/* File name */}
            <div className="flex items-center gap-2 min-w-0">
                <Label htmlFor="file-input" className="text-sm shrink-0">{icons.checkList}</Label>
                <input
                    id='file-input'
                    type="text"
                    value={fileName}
                    onChange={({ target }) => setFileName(target.value)}
                    aria-label="File name"
                    className="text-sm font-medium w-36 min-w-0 h-8 truncate"
                    maxLength={60}
                />
                <span className="text-xs text-(--muted) shrink-0">
                    {isMdMode ? ".md" : ".html"}
                </span>
            </div>

            {/* Converter mode toggle */}
            <Tab
                data={modes}
                activeVal={converterMode as ConverterMode}
                onClick={(val) => setConverterMode(val as ConverterMode)}
            />

            {/* View toggle */}
            <Tab
                data={views}
                activeVal={viewMode as ViewMode}
                onClick={(val) => setViewMode(val as ViewMode)}
            />

            {/* Action buttons */}
            <div className="flex items-center gap-1.5">
                <Button
                    type="button"
                    onClick={openFile}
                    title="Open .md, .txt, or .html file"
                    aria-label="Open file"
                    className="text-xs px-2! py-1!"
                >
                    {icons.folder} Open
                </Button>

                <Button
                    type="button"
                    onClick={downloadMd}
                    title="Download as Markdown (Ctrl+S)"
                    aria-label="Download as Markdown"
                    className="text-xs px-2! py-1!"
                >
                    {icons.download} .md
                </Button>

                {/* .html download only relevant in md-to-html mode */}
                {isMdMode && (
                    <Button
                        type="button"
                        onClick={downloadHtml}
                        title="Download as HTML"
                        aria-label="Download as HTML"
                        className="text-xs px-2! py-1!"
                    >
                        {icons.download} .html
                    </Button>
                )}

                {/* Copy source */}
                <Button
                    type="button"
                    onClick={copySource}
                    title={isMdMode ? "Copy source Markdown" : "Copy source HTML"}
                    aria-label={isMdMode ? "Copy source Markdown" : "Copy source HTML"}
                    className="text-xs px-2! py-1!"
                >
                    {icons.copy} {isMdMode ? "MD" : "HTML"}
                </Button>

                {/* Copy output */}
                <Button
                    type="button"
                    onClick={copyOutput}
                    title={isMdMode ? "Copy rendered HTML" : "Copy converted Markdown"}
                    aria-label={isMdMode ? "Copy rendered HTML" : "Copy converted Markdown"}
                    className="text-xs px-2! py-1!"
                >
                    {icons.upload} {isMdMode ? "HTML" : "MD"}
                </Button>

                <Button
                    type="button"
                    onClick={toggleFullscreen}
                    title={isFullscreen ? "Exit fullscreen (Esc)" : "Fullscreen"}
                    aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                    aria-pressed={isFullscreen}
                    className="text-xs px-2! py-1!"
                >
                    {isFullscreen ? icons.fullscreen : icons.screen}
                </Button>

                <Button
                    type="button"
                    onClick={clear}
                    title="Clear editor"
                    aria-label="Clear all content"
                    className="text-xs px-2! py-1! hover:text-red-500! hover:bg-red-100/5!"
                >
                    {icons.bin}
                </Button>
            </div>

            {/* Hidden file input — now accepts .html too */}
            <input
                ref={fileInputRef}
                type="file"
                accept=".md,.txt,.html"
                className="sr-only"
                onChange={onFileChange}
                aria-hidden="true"
                tabIndex={-1}
            />
        </div>
    )
}