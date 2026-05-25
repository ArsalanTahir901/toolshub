import type { Marked } from "marked";
import type TurndownServiceType from "turndown";

// Types

export type ViewMode = "split" | "source" | "preview";
export type ConverterMode = "md-to-html" | "html-to-md";

export type EditorStats = {
    words: number;
    chars: number;
    lines: number;
    readTime: string;
};

// HTML escape helper (hljs.escapeHTML is internal, not on HLJSApi)

export const escapeHtml = (text: string): string =>
    text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");


// Lazy singletons
//  Both Marked and TurndownService are non-trivial to instantiate.
//  Wrapping them in getters defers the cost to first use and avoids paying it
//  at module-load time (relevant in Next.js route pre-loading).

type MarkedModule = typeof import("marked");
type HighlightModule = typeof import("highlight.js");
type PurifyModule = typeof import("isomorphic-dompurify");

let markedModulePromise: Promise<MarkedModule> | null = null;
let hljsModulePromise: Promise<HighlightModule> | null = null;
let purifyModulePromise: Promise<PurifyModule> | null = null;
let turndownModulePromise: Promise<{ default: new (options?: unknown) => TurndownServiceType }> | null = null;

const loadMarked = (): Promise<MarkedModule> => {
    if (!markedModulePromise) markedModulePromise = import("marked");
    return markedModulePromise;
};

const loadHljs = (): Promise<HighlightModule> => {
    if (!hljsModulePromise) hljsModulePromise = import("highlight.js");
    return hljsModulePromise;
};

const loadPurify = (): Promise<PurifyModule> => {
    if (!purifyModulePromise) purifyModulePromise = import("isomorphic-dompurify");
    return purifyModulePromise;
};

const loadTurndown = (): Promise<{ default: new (options?: unknown) => TurndownServiceType }> => {
    if (!turndownModulePromise) {
        turndownModulePromise = import("turndown") as Promise<{ default: new (options?: unknown) => TurndownServiceType }>;
    }
    return turndownModulePromise;
};

let _parser: Marked | null = null;
const getParser = async (): Promise<Marked> => {
    if (_parser) return _parser;

    const [{ marked, Marked }, hljsMod] = await Promise.all([loadMarked(), loadHljs()]);
    const hljs = hljsMod.default;
    const renderer = new marked.Renderer();

    renderer.code = ({ text, lang }: { text: string; lang?: string }) => {
        const language = lang && hljs.getLanguage(lang) ? lang : "plaintext";
        let highlighted: string;
        try {
            highlighted = hljs.highlight(text, { language }).value;
        } catch {
            highlighted = escapeHtml(text);
        }
        return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`;
    };

    _parser = new Marked({ gfm: true, breaks: true, renderer });
    return _parser;
};

let _turndown: TurndownServiceType | null = null;
const getTurndown = async (): Promise<TurndownServiceType> => {
    if (_turndown) return _turndown;
    const mod = await loadTurndown();
    const TurndownService = mod.default;
    _turndown = new TurndownService({
        headingStyle: "atx",
        codeBlockStyle: "fenced",
        bulletListMarker: "-",
    });
    return _turndown!;
};

// Sanitize
//  isomorphic-dompurify works in both Node (SSR) and browser — no window guard.

const sanitize = async (raw: string): Promise<string> => {
    const mod = await loadPurify();
    const DOMPurify = mod.default;
    return DOMPurify.sanitize(raw, {
        USE_PROFILES: { html: true },
        ADD_TAGS: ["pre", "code"],
        ADD_ATTR: ["class"],
    }) as string;
};

export const convertMarkdownToHtml = async (markdown: string): Promise<string> => {
    const parser = await getParser();
    const raw = parser.parse(markdown) as string;
    return sanitize(raw);
};

export const convertHtmlToMarkdown = async (html: string): Promise<string> => {
    const turndown = await getTurndown();
    return turndown.turndown(html);
};


// Clipboard with execCommand fallback
//  navigator.clipboard is unavailable in HTTP / sandboxed iframes.

export const copyToClipboard = async (text: string): Promise<void> => {
    try {
        await navigator.clipboard.writeText(text);
    } catch {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.cssText = "position:fixed;opacity:0;pointer-events:none;";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
    }
};

// Default content

export const DEFAULT_MD = `# Welcome to Markdown ⇄ HTML Converter

Start writing **Markdown** here and see the live preview on the right.
Switch to **HTML → MD** mode to paste raw HTML and get clean Markdown back.

## Features
- Live split preview
- Two-way conversion: Markdown ⇄ HTML
- Syntax-highlighted code blocks
- Download as \`.md\` or \`.html\`
- Keyboard shortcuts: \`Ctrl+S\` save · \`Ctrl+B\` bold · \`Ctrl+I\` italic

## Code Example
\`\`\`javascript
const greet = (name) => \`Hello, \${name}!\`;
console.log(greet("World"));
\`\`\`

## Table
| Feature      | Supported |
|--------------|-----------|
| GFM          | ✅        |
| Tables       | ✅        |
| Code HL      | ✅        |
| HTML → MD    | ✅        |
| Download     | ✅        |

> **Tip:** Paste any HTML into **HTML → MD** mode to instantly convert it.
`;

// Stats helper
//  In HTML→MD mode, raw htmlInput contains tags that inflate word count.
//  Strip them first so stats reflect actual content, not markup noise.

const stripTags = (html: string): string => html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

export const getStats = (text: string, isHtml = false): EditorStats => {
    const plain = isHtml ? stripTags(text) : text;
    const words = plain.trim() ? plain.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const lines = text.split("\n").length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return { words, chars, lines, readTime: `${minutes} min read` };
};

// Full HTML document template

export const buildHtmlDocument = (body: string, title = "Document"): string =>
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem 1.5rem; color: #1a1a1a; line-height: 1.7; }
    h1,h2,h3,h4,h5,h6 { margin-top: 1.5em; margin-bottom: 0.5em; line-height: 1.3; }
    h1 { font-size: 2em; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.3em; }
    h2 { font-size: 1.5em; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.2em; }
    a { color: #3b82f6; } a:hover { text-decoration: underline; }
    code { background: #f3f4f6; padding: 0.2em 0.4em; border-radius: 4px; font-size: 0.9em; font-family: 'Fira Code', monospace; }
    pre { background: #1e1e2e; border-radius: 8px; padding: 1.2em; overflow-x: auto; }
    pre code { background: none; padding: 0; color: #cdd6f4; font-size: 0.875em; }
    blockquote { border-left: 4px solid #3b82f6; margin: 0; padding: 0.5em 1em; background: #eff6ff; border-radius: 0 6px 6px 0; color: #374151; }
    table { border-collapse: collapse; width: 100%; margin: 1em 0; }
    th, td { border: 1px solid #e5e7eb; padding: 0.6em 1em; text-align: left; }
    th { background: #f9fafb; font-weight: 600; }
    tr:nth-child(even) { background: #f9fafb; }
    img { max-width: 100%; height: auto; border-radius: 8px; }
    hr { border: none; border-top: 2px solid #e5e7eb; margin: 2em 0; }
  </style>
</head>
<body>
${body}
</body>
</html>`;