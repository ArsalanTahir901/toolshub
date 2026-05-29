import { Button } from "@/components/buttons"
import { icons } from "@/components/icons"
import { ClaimsAnalysis } from "@/types/jwt.type"

interface Props {
    visible: boolean
    copyText: () => void
    claims: ClaimsAnalysis | null
}

export const ClaimsTab = ({ visible, claims, copyText }: Props) => {

    if (!visible || !claims) return null;

    return (
        <div className="rounded-lg border border-(--border) my-3 overflow-auto">
            <div className="text-xs border-b border-(--border) flex justify-between items-center gap-3 p-2 px-3">
                <span className="text-(--muted)">Claims Inspector</span>
                <Button
                    className="text-xs! px-2! py-1!"
                    onClick={copyText}
                >
                    {icons.copy} Copy Payload
                </Button>
            </div>
            <div className="p-2 px-3">
                <div className="text-xs text-(--muted) mb-1">Standard Claims</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {[
                        { n: "Issuer (iss)", v: claims.standard.iss },
                        { n: "Subject (sub)", v: claims.standard.sub },
                        { n: "Audience (aud)", v: Array.isArray(claims.standard.aud) ? claims.standard.aud.join(", ") : claims.standard.aud },
                        { n: "Issued At (iat)", v: claims.standard.iat ? new Date(claims.standard.iat * 1000).toLocaleString() : null, d: true },
                        { n: "Expires At (exp)", v: claims.standard.exp ? new Date(claims.standard.exp * 1000).toLocaleString() : null, d: true },
                        { n: "Not Before (nbf)", v: claims.standard.nbf ? new Date(claims.standard.nbf * 1000).toLocaleString() : null, d: true },
                        { n: "JWT ID (jti)", v: claims.standard.jti },
                    ].map(({ n, v, d }, i) => (
                        <div
                            key={i}
                            className="space-y-1.5 py-1.5 px-2.5 bg-(--muted)/10 rounded-md"
                        >
                            <div className="text-xs text-(--muted) mb-2">{n}</div>
                            {v ?
                                <div
                                    className={`${d ? 'text-[10px] opacity-70' : 'text-xs'} break-all`}
                                >{String(v)}</div>
                                :
                                <div className="italic text-xs text-(--muted)">not present</div>
                            }
                        </div>
                    ))}
                </div>
            </div>

            {Object.keys(claims.custom).length > 0 &&
                <div className="p-2 px-3 pt-0 my-2">
                    <div className="text-xs text-(--muted) mb-1">Custom Claims ({Object.keys(claims.custom).length})</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {Object.entries(claims.custom).map(([k, v], i) => (
                            <div
                                key={i}
                                className="space-y-1.5 py-1.5 px-2.5 bg-(--muted)/10 rounded-md"
                            >
                                <div className="text-xs text-(--muted) mb-2 capitalize">{k}</div>
                                <div className="break-all text-xs">{JSON.stringify(v)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            }

            {claims.missing.length > 0
                ? <div className="text-xs text-amber-300/60 px-3 pb-2">
                    {icons.caution} Missing recommended:
                    <b>{claims.missing.join(", ")}</b>
                </div>
                : <div className="text-xs text-green-300/60 px-3 pb-2">
                    {icons.tik} All recommended claims present
                </div>
            }
        </div>
    )
}