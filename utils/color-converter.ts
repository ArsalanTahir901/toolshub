// Types

import { icons } from "@/components/icons";

export type ColorFormat = "hex" | "rgb" | "hsl" | "hsv" | "cmyk";

export type RgbColor = { r: number; g: number; b: number };
export type HslColor = { h: number; s: number; l: number };
export type HsvColor = { h: number; s: number; v: number };
export type CmykColor = { c: number; m: number; y: number; k: number };

export type ColorResult = {
    hex: string;
    rgb: RgbColor;
    hsl: HslColor;
    hsv: HsvColor;
    cmyk: CmykColor;
};

// Constants

export const DEFAULT_HEX = "#3b82f6";

export const FORMATS: { value: ColorFormat; label: string, icon: string }[] = [
    { value: "hex", label: "HEX", icon: icons.hash },
    { value: "rgb", label: "RGB", icon: icons.rainbow },
    { value: "hsl", label: "HSL", icon: icons.palette },
    { value: "hsv", label: "HSV", icon: icons.bursh },
    { value: "cmyk", label: "CMYK", icon: icons.print },
];


export const SWATCHES = [
    "#ef4444", "#f97316", "#eab308", "#22c55e",
    "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899",
    "#ffffff", "#d1d5db", "#6b7280", "#000000",
];

//  Utilities

const clamp = (n: number, min: number, max: number) =>
    Math.max(min, Math.min(max, n));

const round = (n: number, dp = 1) =>
    Math.round(n * 10 ** dp) / 10 ** dp;

// HEX ↔ RGB

export const hexToRgb = (hex: string): RgbColor | null => {
    const clean = hex.replace(/^#/, "").trim();

    const full =
        clean.length === 3
            ? clean.split("").map((c) => c + c).join("")
            : clean.length === 6
                ? clean
                : null;

    if (!full || !/^[0-9a-fA-F]{6}$/.test(full)) {
        return null;
    }

    return {
        r: parseInt(full.slice(0, 2), 16),
        g: parseInt(full.slice(2, 4), 16),
        b: parseInt(full.slice(4, 6), 16),
    };
};

export const rgbToHex = ({ r, g, b }: RgbColor): string =>
    "#" +
    [r, g, b]
        .map((v) =>
            clamp(Math.round(v), 0, 255)
                .toString(16)
                .padStart(2, "0")
        )
        .join("");

// RGB → HSL

export const rgbToHsl = ({ r, g, b }: RgbColor): HslColor => {
    const rn = r / 255;
    const gn = g / 255;
    const bn = b / 255;

    const max = Math.max(rn, gn, bn);
    const min = Math.min(rn, gn, bn);

    const l = (max + min) / 2;

    if (max === min) {
        return { h: 0, s: 0, l: round(l * 100) };
    }

    const d = max - min;

    const s =
        l > 0.5
            ? d / (2 - max - min)
            : d / (max + min);

    let h = 0;

    switch (max) {
        case rn:
            h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
            break;
        case gn:
            h = ((bn - rn) / d + 2) / 6;
            break;
        case bn:
            h = ((rn - gn) / d + 4) / 6;
            break;
    }

    return {
        h: round(h * 360),
        s: round(s * 100),
        l: round(l * 100),
    };
};

// HSL → RGB

export const hslToRgb = ({ h, s, l }: HslColor): RgbColor => {
    const hn = h / 360;
    const sn = s / 100;
    const ln = l / 100;

    if (sn === 0) {
        const v = Math.round(ln * 255);
        return { r: v, g: v, b: v };
    }

    const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) {
            return p + (q - p) * (2 / 3 - t) * 6;
        }
        return p;
    };

    const q =
        ln < 0.5
            ? ln * (1 + sn)
            : ln + sn - ln * sn;

    const p = 2 * ln - q;

    return {
        r: Math.round(hue2rgb(p, q, hn + 1 / 3) * 255),
        g: Math.round(hue2rgb(p, q, hn) * 255),
        b: Math.round(hue2rgb(p, q, hn - 1 / 3) * 255),
    };
};

// RGB → HSV

export const rgbToHsv = ({ r, g, b }: RgbColor): HsvColor => {
    const rn = r / 255;
    const gn = g / 255;
    const bn = b / 255;

    const max = Math.max(rn, gn, bn);
    const min = Math.min(rn, gn, bn);

    const d = max - min;

    const v = max;
    const s = max === 0 ? 0 : d / max;

    let h = 0;

    if (max !== min) {
        switch (max) {
            case rn:
                h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
                break;
            case gn:
                h = ((bn - rn) / d + 2) / 6;
                break;
            case bn:
                h = ((rn - gn) / d + 4) / 6;
                break;
        }
    }

    return {
        h: round(h * 360),
        s: round(s * 100),
        v: round(v * 100),
    };
};

// HSV → RGB

export const hsvToRgb = ({ h, s, v }: HsvColor): RgbColor => {
    const sn = s / 100;
    const vn = v / 100;

    const c = vn * sn;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = vn - c;

    let r1 = 0;
    let g1 = 0;
    let b1 = 0;

    if (h >= 0 && h < 60) [r1, g1, b1] = [c, x, 0];
    else if (h < 120) [r1, g1, b1] = [x, c, 0];
    else if (h < 180) [r1, g1, b1] = [0, c, x];
    else if (h < 240) [r1, g1, b1] = [0, x, c];
    else if (h < 300) [r1, g1, b1] = [x, 0, c];
    else[r1, g1, b1] = [c, 0, x];

    return {
        r: Math.round((r1 + m) * 255),
        g: Math.round((g1 + m) * 255),
        b: Math.round((b1 + m) * 255),
    };
};

// RGB ↔ CMYK

export const rgbToCmyk = ({ r, g, b }: RgbColor): CmykColor => {
    if (r === 0 && g === 0 && b === 0) {
        return { c: 0, m: 0, y: 0, k: 100 };
    }

    const rn = r / 255;
    const gn = g / 255;
    const bn = b / 255;

    const k = 1 - Math.max(rn, gn, bn);

    return {
        c: round(((1 - rn - k) / (1 - k)) * 100),
        m: round(((1 - gn - k) / (1 - k)) * 100),
        y: round(((1 - bn - k) / (1 - k)) * 100),
        k: round(k * 100),
    };
};

export const cmykToRgb = ({ c, m, y, k }: CmykColor): RgbColor => ({
    r: Math.round(255 * (1 - c / 100) * (1 - k / 100)),
    g: Math.round(255 * (1 - m / 100) * (1 - k / 100)),
    b: Math.round(255 * (1 - y / 100) * (1 - k / 100)),
});

// Builders

export const fromRgb = (rgb: RgbColor): ColorResult => ({
    hex: rgbToHex(rgb),
    rgb,
    hsl: rgbToHsl(rgb),
    hsv: rgbToHsv(rgb),
    cmyk: rgbToCmyk(rgb),
});

// Safe because DEFAULT_HEX is hardcoded valid
export const DEFAULT_RESULT = fromRgb(hexToRgb(DEFAULT_HEX)!);

// Parsers

const parseTriple = (
    s: string,
    maxA: number,
    maxB: number,
    maxC: number
): [number, number, number] | null => {
    const m = s.match(
        /^\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*$/
    );

    if (!m) return null;

    const a = +m[1];
    const b = +m[2];
    const c = +m[3];

    if (
        a < 0 || a > maxA ||
        b < 0 || b > maxB ||
        c < 0 || c > maxC
    ) {
        return null;
    }

    return [a, b, c];
};

const parseRgbString = (s: string): RgbColor | null => {
    const parsed = parseTriple(s, 255, 255, 255);
    if (!parsed) return null;

    const [r, g, b] = parsed;
    return { r, g, b };
};

const parseHslString = (s: string): HslColor | null => {
    const parsed = parseTriple(s.replace(/%/g, ""), 360, 100, 100);
    if (!parsed) return null;

    const [h, sVal, l] = parsed;
    return { h, s: sVal, l };
};

const parseHsvString = (s: string): HsvColor | null => {
    const parsed = parseTriple(s.replace(/%/g, ""), 360, 100, 100);
    if (!parsed) return null;

    const [h, sVal, v] = parsed;
    return { h, s: sVal, v };
};

const parseCmykString = (s: string): CmykColor | null => {
    const m = s.replace(/%/g, "").match(
        /^\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*$/
    );

    if (!m) return null;

    const c = +m[1];
    const mv = +m[2];
    const y = +m[3];
    const k = +m[4];

    if ([c, mv, y, k].some((v) => v < 0 || v > 100)) {
        return null;
    }

    return { c, m: mv, y, k };
};

// Formatting

export const formatForInput = (
    result: ColorResult,
    format: ColorFormat
): string => {
    switch (format) {
        case "hex":
            return result.hex;
        case "rgb":
            return `${result.rgb.r}, ${result.rgb.g}, ${result.rgb.b}`;
        case "hsl":
            return `${result.hsl.h}, ${result.hsl.s}%, ${result.hsl.l}%`;
        case "hsv":
            return `${result.hsv.h}, ${result.hsv.s}%, ${result.hsv.v}%`;
        case "cmyk":
            return `${result.cmyk.c}%, ${result.cmyk.m}%, ${result.cmyk.y}%, ${result.cmyk.k}%`;
    }
};

// Pure Converter

export const convertColor = (
    raw: string,
    format: ColorFormat
): { result: ColorResult | null; error: string } => {
    const input = raw.trim();

    if (!input) {
        return {
            result: null,
            error: "",
        };
    }

    let rgb: RgbColor | null = null;

    switch (format) {
        case "hex":
            rgb = hexToRgb(input);
            break;
        case "rgb":
            rgb = parseRgbString(input);
            break;
        case "hsl": {
            const hsl = parseHslString(input);
            if (hsl) rgb = hslToRgb(hsl);
            break;
        }
        case "hsv": {
            const hsv = parseHsvString(input);
            if (hsv) rgb = hsvToRgb(hsv);
            break;
        }
        case "cmyk": {
            const cmyk = parseCmykString(input);
            if (cmyk) rgb = cmykToRgb(cmyk);
            break;
        }
    }

    if (!rgb) {
        return {
            result: null,
            error: "Invalid format — check your input",
        };
    }

    return {
        result: fromRgb(rgb),
        error: "",
    };
};