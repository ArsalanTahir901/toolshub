import { JsonBlockProps } from "@/types/jwt.type";

export function JsonBlock({ data }: JsonBlockProps) {

    const str = typeof data === "string" ? data : JSON.stringify(data, null, 2);

    const html = str.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, m => {
        if (/^"/.test(m)) { if (/:$/.test(m)) return `<span style="color:#7dd3fc">${m}</span>`; return `<span style="color:#86efac">${m}</span>`; }
        if (/true|false/.test(m)) return `<span style="color:#f9a8d4">${m}</span>`;
        if (/null/.test(m)) return `<span style="color:#506079">${m}</span>`;
        return `<span style="color:#fdba74">${m}</span>`;
    });

    return (
        <pre
            style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 11,
                lineHeight: 1.8,
                color: "#8ca3c4",
                overflowX: "auto",
                whiteSpace: "pre-wrap",
                wordBreak: "break-all"
            }}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}