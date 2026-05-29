import { icons } from "@/components/icons"
import { JsonBlock } from "./json-block"
import { DecodedToken, DecodeResult } from "@/types/jwt.type"

interface Props {
    raw: DecodeResult | null
    decoded: DecodedToken | null
}

export const RawOutput = ({ raw, decoded }: Props) => {
    if (!raw) return null
    return (
        <details className="mt-1">
            <summary className="cursor-pointer text-xs py-2 list-none flex gap-5 items-center select-none">
                {icons.chevronDown} Raw Decode Output
            </summary>
            <div className="border border-(--border) rounded-md p-3">
                <JsonBlock
                    data={{
                        success: raw?.success,
                        error: raw?.error,
                        header: decoded?.header,
                        signature: decoded?.signature?.slice(0, 20) + "…"
                    }}
                />
            </div>
        </details>
    )
}