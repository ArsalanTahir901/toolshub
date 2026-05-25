import { Label } from "@/components/label";
import { ERROR_LEVELS, FORMAT_OPTIONS, QrColor, SIZE_OPTIONS } from "@/utils/qrcode";
import { InputHTMLAttributes, SelectHTMLAttributes } from "react";

interface Props {
    errorLevel: string;
    onErrorLevelChange: SelectHTMLAttributes<HTMLSelectElement>['onChange'];
    size: number;
    onSizeChange: SelectHTMLAttributes<HTMLSelectElement>['onChange'];
    format: string;
    onFormatChange: SelectHTMLAttributes<HTMLSelectElement>['onChange'];
    margin: number;
    onMarginChange: InputHTMLAttributes<HTMLInputElement>['onChange'];
    onFgChange: InputHTMLAttributes<HTMLInputElement>['onChange'];
    onBgChange: InputHTMLAttributes<HTMLInputElement>['onChange'];
    colors: QrColor
}

export const OptionGrid = ({
    errorLevel,
    onErrorLevelChange,
    onSizeChange,
    size, format,
    onFormatChange,
    margin,
    onMarginChange,
    colors,
    onFgChange,
    onBgChange
}: Props) => {

    return (
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 w-full mb-3">

            {/* Error Correction */}
            <div className="flex flex-col gap-1">
                <Label htmlFor="qr-error-level">
                    Error Correction
                </Label>
                <select
                    id="qr-error-level"
                    value={errorLevel}
                    onChange={onErrorLevelChange}
                    aria-label="Error correction level"
                >
                    {ERROR_LEVELS.map((lvl) => (
                        <option key={lvl.value} value={lvl.value}>{lvl.label}</option>
                    ))}
                </select>
            </div>

            {/* Size */}
            <div className="flex flex-col gap-1">
                <Label htmlFor="qr-size">
                    Size
                </Label>
                <select
                    id="qr-size"
                    value={size}
                    onChange={onSizeChange}
                    aria-label="QR code size"
                >
                    {SIZE_OPTIONS.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                </select>
            </div>

            {/* Format */}
            <div className="flex flex-col gap-1">
                <Label htmlFor="qr-format">
                    Format
                </Label>
                <select
                    id="qr-format"
                    value={format}
                    onChange={onFormatChange}
                    aria-label="Output format"
                >
                    {FORMAT_OPTIONS.map((f) => (
                        <option key={f.value} value={f.value}>{f.label}</option>
                    ))}
                </select>
            </div>

            {/* Margin */}
            <div className="flex flex-col gap-1">
                <Label htmlFor="qr-margin">
                    Margin — {margin}
                </Label>
                <input
                    id="qr-margin"
                    type="range"
                    min={0}
                    max={6}
                    step={1}
                    value={margin}
                    onChange={onMarginChange}
                    aria-label="QR code margin"
                    className="w-full accent-violet-500"
                />
            </div>

            {/* Foreground color */}
            <div className="flex flex-col gap-1">
                <Label htmlFor="qr-fg">
                    Foreground
                </Label>
                <div className="flex items-center gap-2">
                    <input
                        id="qr-fg"
                        type="color"
                        value={colors.fg}
                        onChange={onFgChange}
                        aria-label="QR code foreground color"
                        className="size-8 rounded cursor-pointer border border-(--border) bg-transparent"
                    />
                    <span className="text-xs font-mono text-(--muted)">{colors.fg}</span>
                </div>
            </div>

            {/* Background color */}
            <div className="flex flex-col gap-1">
                <Label htmlFor="qr-bg">
                    Background
                </Label>
                <div className="flex items-center gap-2">
                    <input
                        id="qr-bg"
                        type="color"
                        value={colors.bg}
                        onChange={onBgChange}
                        aria-label="QR code background color"
                        className="size-8 rounded cursor-pointer border border-(--border) bg-transparent"
                    />
                    <span className="text-xs font-mono text-(--muted)">{colors.bg}</span>
                </div>
            </div>
        </div>
    )
}