import { icons } from "@/components/icons";
import { TokenMetadata } from "@/types/jwt.type";

interface Props {
    visible: boolean
    meta: TokenMetadata | null
}

export const MetadataTab = ({ visible, meta }: Props) => {

    if (!visible || !meta) return null;

    const style: Record<string, string> = {
        ok: 'bg-green-300/10 border border-green-300/30',
        bad: 'bg-red-300/10 border border-red-300/30',
        // warn: 'bg-yellow-300/10 border border-yellow-300/30',
    }

    return (
        <div className="rounded-lg border border-(--border) my-3 overflow-auto">
            <div className="text-xs border-b border-(--border) flex justify-between items-center gap-3 p-2 px-3">
                <span className="text-(--muted)">Token Metadata</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 p-3">
                {[
                    {
                        l: "Algorithm", v: <span
                            className="px-2 rounded-lg font-medium border-cyan-300/10 text-cyan-300 bg-cyan-300/30"
                        >
                            {meta.algorithm || "none"}</span>
                    },
                    { l: "Token Type", v: meta.tokenType || "—" },
                    { l: "Key ID (kid)", v: meta.keyId || "—" },
                    { l: "Total Size", v: `${meta.size} chars` },
                    { l: "Header Size", v: `${meta.headerSize} chars` },
                    { l: "Payload Size", v: `${meta.payloadSize} chars` },
                    { l: "Signature Size", v: `${meta.signatureSize} chars` },
                    { l: "Claim Count", v: `${meta.claimCount} (${meta.customClaimCount} custom)` },
                    {
                        l: "Cookie Safe",
                        v: meta.cookieSafe ? `${icons.check} Yes (≤4096)` : `${icons.crossRed} No (>4096)`,
                        cls: meta.cookieSafe ? "ok" : "bad"
                    },
                ].map(({ l, v, cls }, i) => (
                    <div
                        key={i}
                        className={`py-1.5 px-2.5 rounded-md ${cls ? style[cls] : 'bg-(--muted)/10 border border-(--muted)/30'}`}
                    >
                        <div className="text-[10px] uppercase text-(--muted) mb-1">{l}</div>
                        <div className="text-xs">{v}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}