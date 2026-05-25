import { QrSkeleton } from "@/components/skeletons/qr-code"
import Image from "next/image"

interface Props {
    isGenerating: boolean;
    qrDataUrl: string
    visible: boolean
}

export const QrPreview = ({ isGenerating, qrDataUrl, visible }: Props) => {

    if (!visible) return null;

    return (
        <div className="w-full flex flex-col items-center gap-3 py-3">
            {isGenerating
                ? <QrSkeleton />
                : (
                    <div className="relative w-64 h-64 rounded-(--radius) overflow-hidden border border-(--border)">
                        <Image
                            src={qrDataUrl}
                            alt="Generated QR code"
                            fill
                            className="object-contain"
                            unoptimized  // data URLs don't need Next.js optimization
                        />
                    </div>
                )
            }
        </div>
    )
}