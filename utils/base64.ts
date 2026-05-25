import { icons } from "@/components/icons";

export type Base64Option =
    | "string"
    | "url-safe"
    | "json"
    | "html"
    | "utf8"
    | "jwt"
    | "hex"
    | "file"
    | "image"
    | "audio"
    | "video";

export type Options = { value: Base64Option; label: string }[];

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB
export const MAX_RENDER_SIZE = 800_000;           // UI safe limit

export const options: Options = [
    { value: "string", label: `${icons.checkList} Plain Text` },
    { value: "url-safe", label: `${icons.link} URL Safe Base64` },
    { value: "json", label: `${icons.json} JSON` },
    { value: "html", label: `${icons.globe} HTML` },
    { value: "utf8", label: `${icons.utf8} UTF-8` },
    { value: "jwt", label: `${icons.lockkey} JWT Decode` },
    { value: "hex", label: `${icons.hex} Hex` },
    { value: "file", label: `${icons.folder} File` },
    { value: "image", label: `${icons.image} Image` },
    { value: "audio", label: `${icons.music} Audio` },
    { value: "video", label: `${icons.video} Video` },
];

// ─── Encode / Decode ─────────────────────────────────────────────────────────

// Chunk-based — avoids stack overflow on large Uint8Arrays
export const encodeToBase64 = (str: string): string => {
    const bytes = new TextEncoder().encode(str);
    let binary = "";
    const chunk = 8192;
    for (let i = 0; i < bytes.length; i += chunk) {
        binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
    }
    return btoa(binary);
};

export const decodeFromBase64 = (b64: string): string => {
    const binary = atob(b64);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
};

// ─── MIME Detection ───────────────────────────────────────────────────────────

// Known binary magic-byte signatures (as Base64 prefixes)
const MIME_SIGNATURES: [string, string, string][] = [
    ["JVBERi", "application/pdf", "pdf"],
    ["iVBORw", "image/png", "png"],
    ["/9j/", "image/jpeg", "jpg"],
    ["R0lGOD", "image/gif", "gif"],
    ["UEsDB", "application/zip", "zip"],
    ["PD94bW", "application/xml", "xml"],
    ["AAABAA", "image/x-icon", "ico"],
    ["Qk0", "image/bmp", "bmp"],
    ["SUkqAA", "image/tiff", "tiff"],
    ["T2dnU", "audio/ogg", "ogg"],
    ["//uQ", "audio/mpeg", "mp3"],
    ["SUQz", "audio/mpeg", "mp3"],
    ["AAAA", "video/mp4", "mp4"],
    ["GkXf", "video/webm", "webm"],
];

/**
 * Detect MIME type + extension from a raw Base64 string.
 * Falls back to text/plain when content is valid UTF-8 with no null bytes,
 * and application/octet-stream as last resort.
 */
export const detectMimeFromBase64 = (b64: string): { mime: string; ext: string } => {
    // 1. Binary magic-byte check
    for (const [sig, mime, ext] of MIME_SIGNATURES) {
        if (b64.startsWith(sig)) return { mime, ext };
    }

    // 2. Text heuristic — decode a small sample
    try {
        const sample = b64.substring(0, 2000); // ~1.5 KB decoded
        const binary = atob(sample);
        const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
        const decoded = new TextDecoder("utf-8", { fatal: true }).decode(bytes);

        // Null bytes = binary; absence = plain text
        if (!decoded.includes("\0")) {
            return { mime: "text/plain", ext: "txt" };
        }
    } catch {
        // TextDecoder threw → not valid UTF-8 → binary
    }

    // 3. Unknown binary
    return { mime: "application/octet-stream", ext: "bin" };
};

// ─── MIME → Extension map (for file.type from File API) ──────────────────────

const MIME_EXT_MAP: Record<string, string> = {
    "audio/mpeg": "mp3",
    "audio/mp3": "mp3",
    "audio/wav": "wav",
    "audio/ogg": "ogg",
    "audio/aac": "aac",
    "audio/flac": "flac",
    "video/mp4": "mp4",
    "video/webm": "webm",
    "video/ogg": "ogv",
    "video/quicktime": "mov",
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/bmp": "bmp",
    "image/svg+xml": "svg",
    "application/pdf": "pdf",
    "application/zip": "zip",
    "text/plain": "txt",
    "text/html": "html",
    "text/csv": "csv",
    "application/json": "json",
};

export const getExtensionFromMime = (mime: string): string =>
    MIME_EXT_MAP[mime] ?? "";

// ─── Worker factory ───────────────────────────────────────────────────────────

export const createBase64Worker = () =>
    new Worker(new URL("../workers/base64.worker.ts", import.meta.url));