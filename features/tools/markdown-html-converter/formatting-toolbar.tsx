import { icons } from "@/components/icons";
import { ToolbarBtn } from "./toolbar-btn"

interface Toolbar {
    bold: () => void;
    italic: () => void;
    strike: () => void;
    code: () => void;
    codeBlock: () => void;
    h1: () => void;
    h2: () => void;
    h3: () => void;
    link: () => void;
    image: () => void;
    quote: () => void;
    ul: () => void;
    ol: () => void;
    hr: () => void;
    table: () => void;
}

interface Props {
    isMdMode: boolean
    showEditor: boolean
    toolbar: Toolbar
}

const ToolbarDivider = () => (
    <div className="w-px h-5 bg-(--border) mx-1.5" aria-hidden="true" />
)

export const FormatingToolbar = ({ isMdMode, toolbar, showEditor }: Props) => {

    if (!showEditor) return null;

    return (
        <div
            role="toolbar"
            aria-label="Text formatting"
            aria-disabled={!isMdMode}
            className="flex items-center gap-0.5 flex-wrap px-3 py-1.5 border-b border-(--border) bg-(--card)/60"
        >
            <ToolbarBtn label="H1" title="Heading 1" onClick={toolbar.h1} disabled={!isMdMode} />
            <ToolbarBtn label="H2" title="Heading 2" onClick={toolbar.h2} disabled={!isMdMode} />
            <ToolbarBtn label="H3" title="Heading 3" onClick={toolbar.h3} disabled={!isMdMode} />
            <ToolbarDivider />
            <ToolbarBtn label="B" title="Bold" onClick={toolbar.bold} disabled={!isMdMode} kbd="Ctrl+B" />
            <ToolbarBtn label="I" title="Italic" onClick={toolbar.italic} disabled={!isMdMode} kbd="Ctrl+I" />
            <ToolbarBtn label="S̶" title="Strikethrough" onClick={toolbar.strike} disabled={!isMdMode} />
            <ToolbarDivider />
            <ToolbarBtn label="`" title="Inline code" onClick={toolbar.code} disabled={!isMdMode} />
            <ToolbarBtn label="```" title="Code block" onClick={toolbar.codeBlock} disabled={!isMdMode} />
            <ToolbarDivider />
            <ToolbarBtn label={icons.link} title="Link" onClick={toolbar.link} disabled={!isMdMode} />
            <ToolbarBtn label={icons.image} title="Image" onClick={toolbar.image} disabled={!isMdMode} />
            <ToolbarBtn label="❝" title="Blockquote" onClick={toolbar.quote} disabled={!isMdMode} />
            <ToolbarDivider />
            <ToolbarBtn label="•" title="Unordered list" onClick={toolbar.ul} disabled={!isMdMode} />
            <ToolbarBtn label="1." title="Ordered list" onClick={toolbar.ol} disabled={!isMdMode} />
            <ToolbarBtn label="—" title="Horizontal rule" onClick={toolbar.hr} disabled={!isMdMode} />
            <ToolbarBtn label="⊞" title="Table" onClick={toolbar.table} disabled={!isMdMode} />

            {/* Hint shown when in html-to-md mode */}
            {!isMdMode && (
                <span className="ml-2 mt-0.5 text-xs text-(--muted) italic">
                    Toolbar available in MD → HTML mode
                </span>
            )}
        </div>
    )
}