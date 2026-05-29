import { Button } from "@/components/buttons"
import { icons } from "@/components/icons"
import { DecodedToken } from "@/types/jwt.type"
import { JsonBlock } from "./json-block"

interface Props {
    visible: boolean
    decoded: DecodedToken | null
    copyText: (val: string) => void
}

export const DecodedTab = ({ decoded, visible, copyText }: Props) => {
    if (!visible || !decoded) return null;
    return (
        <div className="rounded-lg border border-(--border) my-3 overflow-auto">
            <div className="text-xs border-b border-(--border) flex justify-between items-center gap-3 p-2 px-3">
                <span className="text-(--muted)">Token Segments</span>
                <Button
                    className="text-xs! px-2! py-1!"
                    onClick={() => copyText(JSON.stringify(decoded, null, 2))}
                >
                    {icons.copy} Copy All
                </Button>
            </div>
            <div className="p-3 max-h-52 overflow-auto">
                <div className="flex flex-col sm:flex-row rounded-md text-[10px] overflow-hidden">
                    <div className="flex-1 bg-purple-300/10 leading-relaxed uppercase p-2 wrap-break-word break-all border-b sm:border-r border-(--border)">
                        <span>Header</span>
                        <div className="text-purple-300/70">{decoded.encodedHeader}</div>
                    </div>
                    <div className="flex-1 bg-green-300/10 leading-relaxed uppercase p-2 wrap-break-word break-all border-b sm:border-r border-(--border)">
                        <span>Payload</span>
                        <div className="text-green-300/70">{decoded.encodedPayload}</div>
                    </div>
                    <div className="flex-1 bg-amber-300/10 leading-relaxed uppercase p-2 wrap-break-word break-all">
                        <span>Signature</span>
                        <div className="text-amber-300/70">{decoded.signature.slice(0, 24)}...</div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 text-xs">
                <div>
                    HEADER
                    <JsonBlock data={decoded.header} />
                </div>
                <div>
                    PAYLOAD
                    <JsonBlock data={decoded.payload} />
                </div>
            </div>
        </div>
    )
}