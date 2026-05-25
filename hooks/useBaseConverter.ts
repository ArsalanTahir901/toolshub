import { saveAs } from 'file-saver';
import {
    type Base64Option,
    createBase64Worker,
    decodeFromBase64,
    detectMimeFromBase64,
    encodeToBase64,
    getExtensionFromMime,
    MAX_FILE_SIZE,
    MAX_RENDER_SIZE,
    options,
} from "@/utils/base64";

import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export const useBaseConverter = () => {

    const [value, setValue] = useState("");
    const [result, setResult] = useState("");
    const [fullBase64, setFullBase64] = useState("");
    const [option, setOption] = useState<Base64Option>(options[0].value);
    const [fileName, setFileName] = useState("");
    const [imgSrc, setImgSrc] = useState("");
    const [mediaSrc, setMediaSrc] = useState("");
    const [isLarge, setIsLarge] = useState(false);
    const [isEncoding, setIsEncoding] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [downloadExt, setDownloadExt] = useState("bin");

    const fileInputRef = useRef<HTMLInputElement>(null);
    const workerRef = useRef<Worker | null>(null);
    // Track object URLs so we can revoke them — fixes memory leak
    const previewUrlRef = useRef<string | null>(null);

    // ─── Modes ───────────────────────────────────────────────────────────────
    const isImageMode = option === "image";
    const isAudioMode = option === "audio";
    const isVideoMode = option === "video";
    const isFileBased = option === "file" || isImageMode || isAudioMode || isVideoMode;

    // ─── Worker ──────────────────────────────────────────────────────────────
    useEffect(() => {
        workerRef.current = createBase64Worker();

        workerRef.current.onmessage = (event) => {
            const { success, base64, error, fileName, size } = event.data;

            setIsEncoding(false);

            if (!success) {
                toast.error(error ?? "Encoding failed");
                return;
            }

            setFullBase64(base64);

            if (fileName) {
                setFileName(fileName);
                setDownloadExt(fileName.split(".").pop() || "bin");
            }

            if (base64.length > MAX_RENDER_SIZE) {
                setIsLarge(true);
                setResult(
                    `Large file encoded successfully\n` +
                    `Size: ${(size / 1024 / 1024).toFixed(2)} MB\n\n` +
                    `Use Download or Copy`
                );
            } else {
                setIsLarge(false);
                setResult(base64);
            }

            toast.success("Encoded successfully");
        };

        return () => {
            workerRef.current?.terminate();
            // Revoke any lingering preview URL on unmount
            if (previewUrlRef.current) {
                URL.revokeObjectURL(previewUrlRef.current);
            }
        };
    }, []);

    // ─── Reset ───────────────────────────────────────────────────────────────
    const resetAll = useCallback(() => {
        setValue("");
        setFileName("");
        setResult("");
        setImgSrc("");
        setMediaSrc("");
        setFullBase64("");
        setIsLarge(false);
        setDownloadExt("bin"); // FIX: was missing — stale ext bled into next session

        // FIX: revoke previous object URL to free memory
        if (previewUrlRef.current) {
            URL.revokeObjectURL(previewUrlRef.current);
            previewUrlRef.current = null;
        }
    }, []);

    // ─── Handlers ────────────────────────────────────────────────────────────
    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value);

    const onOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setOption(e.target.value as Base64Option);
        resetAll();
    };

    const openFilePicker = () => fileInputRef.current?.click();

    // ─── File Encode (via Worker) ─────────────────────────────────────────────
    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > MAX_FILE_SIZE) {
            toast.error("File too large (max 50 MB)");
            return;
        }

        resetAll(); // revokes previous preview URL inside

        setIsEncoding(true);

        // Extension: prefer mime map, fallback to file name extension
        const ext = getExtensionFromMime(file.type) || file.name.split(".").pop() || "bin";
        setDownloadExt(ext);

        // Instant preview — create and track the URL
        const previewUrl = URL.createObjectURL(file);
        previewUrlRef.current = previewUrl; // track for cleanup

        if (isImageMode) setImgSrc(previewUrl);
        if (isAudioMode || isVideoMode) setMediaSrc(previewUrl);

        workerRef.current?.postMessage(file);

        e.target.value = ""; // allow re-selecting same file
    };

    // ─── Shared Download Helper ───────────────────────────────────────────────
    const triggerDownload = useCallback(async (
        base64: string,
        ext: string,
        mime: string,
        name?: string
    ) => {
        try {
            const clean = base64.replace(/[\s\n\r]/g, "");

            // Browser-native fast decode
            const response = await fetch(`data:${mime};base64,${clean}`);
            const blob = await response.blob();

            saveAs(blob, name || `decoded.${ext}`);

            toast.success(`Downloaded as .${ext}`);
        } catch (err) {
            console.error("Download error:", err);
            toast.error("Download failed — invalid Base64");
        }
    }, []);

    // Encode flow: download the encoded file
    const downloadBase64AsFile = useCallback(async (base64Override?: string) => {
        const source = base64Override || fullBase64;
        if (!source) {
            toast.error("No encoded data to download");
            return;
        }
        await triggerDownload(source, downloadExt, "application/octet-stream", fileName || undefined);
    }, [fullBase64, downloadExt, fileName, triggerDownload]);

    // Decode flow: paste Base64 → detect type → download
    // detects mime/ext from content instead of always using "bin"
    const decodeAndDownload = useCallback(async () => {
        const trimmed = value.trim();
        if (!trimmed) {
            toast.error("Paste a Base64 string first");
            return;
        }
        try {
            const { mime, ext } = detectMimeFromBase64(trimmed);
            if (isImageMode) setImgSrc(`data:${mime};base64,${trimmed}`);
            await triggerDownload(trimmed, ext, mime, fileName || undefined);
        } catch {
            toast.error("Invalid Base64 string");
        }
    }, [value, isImageMode, triggerDownload, fileName]);

    // ─── Copy ────────────────────────────────────────────────────────────────
    const onCopy = async () => {
        const text = fullBase64 || result;
        if (!text) return;
        try {
            await navigator.clipboard.writeText(text);
            toast.success("Copied successfully");
        } catch {
            toast.error("Copy failed");
        }
    };

    // ─── Text Encode ──────────────────────────────────────────────────────────
    // setTimeout(fn, 0) yields to React so spinner actually paints
    // before synchronous work blocks the main thread
    const b64Encode = () => {
        if (!value.trim()) return;
        setResult("");
        setFullBase64("");
        setIsProcessing(true);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => { // double rAF — guaranteed paint
                try {
                    let encoded = "";

                    switch (option) {
                        case "string":
                        case "utf8":
                        case "html":
                            encoded = encodeToBase64(value);
                            break;

                        case "url-safe":
                            encoded = encodeToBase64(value)
                                .replace(/\+/g, "-")
                                .replace(/\//g, "_")
                                .replace(/=/g, "");
                            break;

                        case "json":
                            encoded = btoa(JSON.stringify(JSON.parse(value)));
                            break;

                        case "hex": {
                            const hex = value.replace(/\s+/g, "");
                            if (!/^[0-9a-fA-F]+$/.test(hex) || hex.length % 2 !== 0) {
                                toast.error("Invalid hex string");
                                return;
                            }
                            const bytes = new Uint8Array(
                                hex.match(/.{1,2}/g)!.map((b) => parseInt(b, 16))
                            );
                            const CHUNK = 8192;
                            let binary = "";
                            for (let i = 0; i < bytes.length; i += CHUNK) {
                                binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
                            }
                            encoded = btoa(binary);
                            break;
                        }

                        default:
                            encoded = encodeToBase64(value);
                    }

                    setResult(encoded);
                    setFullBase64(encoded);
                } catch {
                    toast.error("Encoding failed — check your input");
                } finally {
                    setIsProcessing(false);
                }
            });
        });
    };

    // ─── Text Decode ──────────────────────────────────────────────────────────
    const b64Decode = () => {
        if (!value.trim()) return;
        setResult("");
        setFullBase64("");
        setIsProcessing(true);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => { // double rAF — guaranteed paint
                try {
                    let decoded = "";

                    switch (option) {
                        case "string":
                        case "utf8":
                        case "html":
                            decoded = decodeFromBase64(value);
                            break;

                        case "url-safe": {
                            const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
                            const padded = normalized + "=".repeat((4 - normalized.length % 4) % 4);
                            decoded = decodeFromBase64(padded);
                            break;
                        }

                        case "json":
                            decoded = JSON.stringify(JSON.parse(atob(value)), null, 2);
                            break;

                        case "jwt": {
                            const parts = value.trim().split(".");
                            if (parts.length < 2) {
                                toast.error("Invalid JWT");
                                return;
                            }
                            const dec = (s: string) => JSON.parse(atob(
                                s.replace(/-/g, "+").replace(/_/g, "/") +
                                "=".repeat((4 - s.length % 4) % 4)
                            ));
                            decoded = JSON.stringify(
                                { header: dec(parts[0]), payload: dec(parts[1]) },
                                null, 2
                            );
                            break;
                        }

                        case "hex": {
                            const binary = atob(value);
                            decoded = Array.from(binary)
                                .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
                                .join(" ");
                            break;
                        }

                        default:
                            decoded = decodeFromBase64(value);
                    }

                    setResult(decoded);
                } catch {
                    toast.error("Decoding failed — check your input");
                } finally {
                    setIsProcessing(false);
                }
            });
        });
    };

    return {
        options,
        option,
        value,
        result,
        fullBase64,
        fileName,
        imgSrc,
        mediaSrc,
        fileInputRef,
        isFileBased,
        isImageMode,
        isAudioMode,
        isVideoMode,
        isLarge,
        isEncoding,
        isProcessing,
        onChange,
        onOptionChange,
        onFileChange,
        openFilePicker,
        downloadBase64AsFile,
        decodeAndDownload,
        onCopy,
        b64Encode,
        b64Decode,
    };
};