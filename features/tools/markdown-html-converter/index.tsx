'use client'
import { StatsBar } from "./statbar"
import { Topbar } from "./topbar"
import { FormatingToolbar } from "./formatting-toolbar"
import { SourcePane } from "./source-pane"
import { OutputPane } from "./output-pane"
import { useMarkdownHtmlConverter } from "@/hooks/useMarkdownHtmlConverter"
import { Section } from "@/components/section"
import "highlight.js/styles/github-dark.css";

const MarkdownHtmlConverter = () => {
    const {
        // State
        md,
        htmlInput,
        renderedHtml,
        convertedMd,
        converterMode,
        viewMode,
        fileName,
        isFullscreen,
        stats,
        isMdMode,
        // Refs
        textareaRef,
        previewRef,
        fileInputRef,
        containerRef,
        // Setters
        setMd,
        setHtmlInput,
        setConverterMode,
        setViewMode,
        setFileName,
        // Actions
        toolbar,
        openFile,
        onFileChange,
        downloadMd,
        downloadHtml,
        copySource,
        copyOutput,
        clear,
        toggleFullscreen,
    } = useMarkdownHtmlConverter()

    const showEditor = viewMode === "source" || viewMode === "split"
    const showPreview = viewMode === "preview" || viewMode === "split"

    return (
        <>
            <Section
                ref={containerRef}
                aria-label="Markdown ⇄ HTML Converter"
                className={`
                    flex flex-col gap-0
                    rounded-2xl border border-(--border)
                    bg-(--card) overflow-hidden
                    transition-all duration-300 p-0!
                    ${isFullscreen ? "fixed inset-2 z-9999 rounded-2xl shadow-2xl" : ""}
                `}
            >
                {/* Top bar */}
                <Topbar
                    clear={clear}
                    converterMode={converterMode}
                    copyOutput={copyOutput}
                    copySource={copySource}
                    downloadHtml={downloadHtml}
                    downloadMd={downloadMd}
                    fileInputRef={fileInputRef}
                    fileName={fileName}
                    isFullscreen={isFullscreen}
                    isMdMode={isMdMode}
                    onFileChange={onFileChange}
                    openFile={openFile}
                    setConverterMode={setConverterMode}
                    setFileName={setFileName}
                    setViewMode={setViewMode}
                    toggleFullscreen={toggleFullscreen}
                    viewMode={viewMode}
                />

                {/* Formatting toolbar (MD→HTML mode only) */}
                <FormatingToolbar showEditor={showEditor} isMdMode={isMdMode} toolbar={toolbar} />

                {/* Editor / Preview panes */}
                <div className={`flex min-h-0 ${isFullscreen ? "flex-1 overflow-hidden" : ""}`}>

                    {/* Source pane */}
                    <SourcePane
                        showEditor={showEditor}
                        isMdMode={isMdMode}
                        textareaOnChange={({ target }) => {
                            if (isMdMode) { setMd(target.value) }
                            else { setHtmlInput(target.value) }
                        }}
                        textareaRef={textareaRef}
                        textareaValue={isMdMode ? md : htmlInput}
                        viewMode={viewMode}
                    />

                    {/* Output pane */}
                    <OutputPane
                        convertedMd={convertedMd}
                        isMdMode={isMdMode}
                        previewRef={previewRef}
                        renderedHtml={renderedHtml}
                        showPreview={showPreview}
                        viewMode={viewMode}
                    />
                </div>

                {/* Status bar */}
                <div className="flex items-center justify-between px-4 py-2 border-t border-(--border) bg-(--card)/60">
                    <StatsBar {...stats} />
                    <div className="flex items-center gap-3 text-xs text-(--muted)">
                        {isMdMode ? (
                            <>
                                <span>Ctrl+B bold</span>
                                <span aria-hidden="true">·</span>
                                <span>Ctrl+I italic</span>
                                <span aria-hidden="true">·</span>
                                <span>Ctrl+S save</span>
                            </>
                        ) : (
                            <span>Paste HTML · get Markdown</span>
                        )}
                    </div>
                </div>

            </Section>
        </>
    )
}

export default MarkdownHtmlConverter