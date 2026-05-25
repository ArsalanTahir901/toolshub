import type { ViewMode } from "@/utils/markdown-to-html";

import {
    useCallback,
    useRef,
    useState,
} from "react";

import { useClipboard } from "./useClipboard";
import { useConverterEngine } from "./useConverterEngine";
import { useEditorActions } from "./useEditorActions";
import { useFileIO } from "./useFileIO";
import { useFullscreen } from "./useFullscreen";
import { useKeyboardShortcuts } from "./useKeyboardShortcuts";

export const useMarkdownHtmlConverter = () => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const previewRef = useRef<HTMLDivElement>(null);

    const [fileName, setFileName] = useState("document");

    const [viewMode, setViewMode] = useState<ViewMode>("split");

    const engine = useConverterEngine();

    const fullscreen = useFullscreen();

    const editor = useEditorActions({
        textareaRef,
        isMdMode: engine.isMdMode,
        setActiveInput:
            engine.setActiveInput,
    });

    const fileIO = useFileIO({
        md: engine.md,
        htmlInput: engine.htmlInput,
        renderedHtml: engine.renderedHtml,
        convertedMd: engine.convertedMd,
        fileName,
        markdownUtils: engine.markdownUtils,
        isMdMode: engine.isMdMode,
        setMd: engine.setMd,
        setHtmlInput: engine.setHtmlInput,
        setConverterMode: engine.setConverterMode,
    });

    const clipboard = useClipboard({
        markdownUtils: engine.markdownUtils,
        activeInput: engine.activeInput,
        activeOutput: engine.activeOutput,
        isMdMode: engine.isMdMode,
    });

    useKeyboardShortcuts({
        textareaRef,
        downloadMd: fileIO.downloadMd,
        wrapSelection: editor.wrapSelection,
    });

    const clear = useCallback(() => {
        if (!engine.activeInput) {
            return;
        }

        if (!confirm("Clear all content?",)) {
            return;
        }

        engine.setActiveInput("");
    }, [engine]);

    return {
        md: engine.md,
        htmlInput: engine.htmlInput,
        renderedHtml: engine.renderedHtml,
        convertedMd: engine.convertedMd,
        converterMode: engine.converterMode,
        viewMode,
        fileName,
        isFullscreen: fullscreen.isFullscreen,
        stats: engine.stats,
        activeInput: engine.activeInput,
        activeOutput: engine.activeOutput,
        isMdMode: engine.isMdMode,
        textareaRef,
        previewRef,
        fileInputRef: fileIO.fileInputRef,
        containerRef: fullscreen.containerRef,
        setMd: engine.setMd,
        setHtmlInput: engine.setHtmlInput,
        setConverterMode: engine.setConverterMode,
        setViewMode,
        setFileName,
        toolbar: editor.toolbar,
        openFile: fileIO.openFile,
        onFileChange: fileIO.onFileChange,
        downloadMd: fileIO.downloadMd,
        downloadHtml: fileIO.downloadHtml,
        copySource: clipboard.copySource,
        copyOutput: clipboard.copyOutput,
        clear,
        toggleFullscreen: fullscreen.toggleFullscreen,
    };
};