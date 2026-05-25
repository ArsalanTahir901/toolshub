// ─── Types ────────────────────────────────────────────────────────────────────

import { icons } from "@/components/icons";

export type QrErrorLevel = "L" | "M" | "Q" | "H";
export type QrFormat = "png" | "svg" | "jpeg";

export type FormatOption = { value: QrFormat; label: string };

export type ErrorLevel = { value: QrErrorLevel; label: string; desc: string }

export type QrSize = { value: number; label: string };
export type QrColor = { fg: string; bg: string };

// ─── Constants ────────────────────────────────────────────────────────────────

export const ERROR_LEVELS: ErrorLevel[] = [
    { value: "L", label: `${icons.low} Low (7%)`, desc: "Smallest QR, less damage tolerance" },
    { value: "M", label: `${icons.medium} Medium (15%)`, desc: "Balanced — good for most use cases" },
    { value: "Q", label: `${icons.quarter} Quartile (25%)`, desc: "Better recovery, slightly larger" },
    { value: "H", label: `${icons.high} High (30%)`, desc: "Best recovery, largest QR code" },
];

export const SIZE_OPTIONS: QrSize[] = [
    { value: 128, label: `${icons.mobile} 128 px` },
    { value: 256, label: `${icons.lcd} 256 px` },
    { value: 512, label: `${icons.receipt} 512 px` },
    { value: 1024, label: `${icons.camera} 1024 px` },
];

export const FORMAT_OPTIONS: FormatOption[] = [
    { value: "png", label: `${icons.image} PNG` },
    { value: "svg", label: `${icons.vector} SVG` },
    { value: "jpeg", label: `${icons.jpg} JPEG` },
];

export const DEFAULT_COLORS: QrColor = { fg: "#000000", bg: "#ffffff" };