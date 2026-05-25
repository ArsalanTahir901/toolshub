import { ChangeEvent, useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
    DEFAULT_COLORS,
    QrColor,
    QrErrorLevel,
    QrFormat,
} from "@/utils/qrcode";

// Lazy-loaded QR lib cache
let qrLib: typeof import("qrcode") | null = null;

async function getQrLib() {
    if (!qrLib) {
        qrLib = await import("qrcode");
    }

    return qrLib;
}

export const useQrGenerator = () => {
    const [text, setText] = useState("");
    const [qrDataUrl, setQrDataUrl] = useState("");
    const [qrSvg, setQrSvg] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [errorLevel, setErrorLevel] = useState<QrErrorLevel>("M");
    const [size, setSize] = useState<number>(512);
    const [format, setFormat] = useState<QrFormat>("png");
    const [colors, setColors] = useState<QrColor>(DEFAULT_COLORS);
    const [margin, setMargin] = useState<number>(2);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Helpers
    const reset = useCallback(() => {
        setQrDataUrl("");
        setQrSvg("");
    }, []);

    const onTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const onFgChange = (e: ChangeEvent<HTMLInputElement>) => {
        setColors((prev) => ({
            ...prev,
            fg: e.target.value,
        }));
    };

    const onBgChange = (e: ChangeEvent<HTMLInputElement>) => {
        setColors((prev) => ({
            ...prev,
            bg: e.target.value,
        }));
    };

    const onErrorLevelChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setErrorLevel(e.target.value as QrErrorLevel);
    };

    const onSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSize(Number(e.target.value));
    };

    const onFormatChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setFormat(e.target.value as QrFormat);
    };

    const onMarginChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMargin(Number(e.target.value));
    };

    // Generate
    const generate = async () => {
        if (!text.trim()) {
            toast.error("Enter text or URL first");
            return;
        }

        reset();
        setIsGenerating(true);

        // Allow React to paint loader first
        await new Promise((resolve) =>
            setTimeout(resolve, 0)
        );

        try {
            const QRCode = (await getQrLib());

            const opts: import("qrcode").QRCodeToDataURLOptions = {
                errorCorrectionLevel: errorLevel,
                width: size,
                margin,
                color: {
                    dark: colors.fg,
                    light: colors.bg,
                },
            };

            if (format === "svg") {
                const svg = await QRCode.toString(text, {
                    type: "svg",
                    errorCorrectionLevel: errorLevel,
                    margin,
                    color: {
                        dark: colors.fg,
                        light: colors.bg,
                    },
                });

                setQrSvg(svg);

                // PNG preview
                const preview = await QRCode.toDataURL(
                    text,
                    {
                        ...opts,
                        type: "image/png",
                    }
                );

                setQrDataUrl(preview);
            } else {
                const type =
                    format === "jpeg"
                        ? "image/jpeg"
                        : "image/png";

                const dataUrl = await QRCode.toDataURL(text, {
                    ...opts,
                    type,
                });

                setQrDataUrl(dataUrl);
            }

            toast.success("QR code generated!");
        } catch (error) {
            console.error(error);
            toast.error("Generation failed, The amount of data is too big to be stored in a QR Code");
        } finally {
            setIsGenerating(false);
        }
    };

    // Download

    const download = () => {
        if (!qrDataUrl && !qrSvg) {
            toast.error("Generate a QR code first");
            return;
        }

        try {
            const a = document.createElement("a");

            a.download = `qrcode.${format}`;

            if (format === "svg" && qrSvg) {
                const blob = new Blob([qrSvg], {
                    type: "image/svg+xml",
                });

                const url = URL.createObjectURL(blob);

                a.href = url;
                a.click();

                setTimeout(() => {
                    URL.revokeObjectURL(url);
                }, 1000);
            } else {
                a.href = qrDataUrl;
                a.click();
            }

            toast.success("Downloaded!");
        } catch (error) {
            console.error(error);

            toast.error("Download failed");
        }
    };

    // Copy PNG to clipboard

    const copyToClipboard = async () => {
        if (!qrDataUrl) {
            toast.error("Generate a QR code first");
            return;
        }

        try {
            const res = await fetch(qrDataUrl);
            const blob = await res.blob();
            await navigator.clipboard.write([
                new ClipboardItem({
                    "image/png": blob,
                }),
            ]);

            toast.success("Copied to clipboard!");
        } catch (error) {
            console.error(error);

            toast.error("Copy failed. Browser may not support image copy");
        }
    };

    return {
        // state
        text,
        qrDataUrl,
        qrSvg,
        isGenerating,
        errorLevel,
        size,
        format,
        colors,
        margin,
        canvasRef,

        // handlers
        onTextChange,
        onFgChange,
        onBgChange,
        onErrorLevelChange,
        onSizeChange,
        onFormatChange,
        onMarginChange,

        // actions
        generate,
        download,
        copyToClipboard,
    };
};