'use client'
import { Button } from "@/components/buttons"
import { Spinner } from "@/components/skeletons/spinner"
import { ToolCard } from "@/components/tool-card"
import { useQrGenerator } from "@/hooks/useQrCodeGenerator"
import { QrPreview } from "./qr-preview"
import { OptionGrid } from "./options-grid"
import { toolsConstant } from "@/features/tools/registry"
import { icons } from "@/components/icons"
import { ToolsConstantKeyEnums } from "@/types/tools"

const QrGenerator = () => {
    const {
        text,
        qrDataUrl,
        isGenerating,
        errorLevel,
        size,
        format,
        colors,
        margin,
        onTextChange,
        onFgChange,
        onBgChange,
        onErrorLevelChange,
        onSizeChange,
        onFormatChange,
        onMarginChange,
        generate,
        download,
        copyToClipboard,
    } = useQrGenerator()

    const hasResult = !!qrDataUrl

    return (
        <ToolCard
            defaultOpen
            {...toolsConstant[ToolsConstantKeyEnums.QR_CODE]}
            textarea={{
                id: 'qr-input',
                name: 'qr-text',
                value: text,
                onChange: onTextChange,
                placeholder: 'Enter URL, text, email, phone number…',
                'aria-label': 'QR code input',
            }}
        >
            {/* Options grid*/}
            <OptionGrid
                colors={colors}
                errorLevel={errorLevel}
                format={format}
                margin={margin}
                onBgChange={onBgChange}
                onErrorLevelChange={onErrorLevelChange}
                onFgChange={onFgChange}
                onFormatChange={onFormatChange}
                onMarginChange={onMarginChange}
                onSizeChange={onSizeChange}
                size={size}
            />

            {/* Generate button */}
            <Button
                variant="glow"
                onClick={generate}
                disabled={isGenerating}
                className="w-full"
            >
                {isGenerating ? <Spinner /> : `${icons.zap} Generate QR Code`}
            </Button>

            {/* QR Preview */}
            <QrPreview
                isGenerating={isGenerating}
                qrDataUrl={qrDataUrl}
                visible={isGenerating || hasResult}
            />

            {/* Action buttons */}
            {hasResult && !isGenerating && (
                <div className="w-full flex gap-2">
                    <Button
                        variant="glow"
                        onClick={download}
                        className="flex-1"
                    >
                        {icons.download} Download {format.toUpperCase()}
                    </Button>
                    <Button
                        onClick={copyToClipboard}
                        className="flex-1"
                    >
                        {icons.copy} Copy PNG
                    </Button>
                </div>
            )}

            {/* Result placeholder */}
            {!hasResult && !isGenerating && (
                <div className="result-box w-full text-center">
                    QR code preview appears here
                </div>
            )}
        </ToolCard>
    )
}

export default QrGenerator