import { SecurityAnalysis } from "@/types/jwt.type"
import { riskColor } from "./styles"
import { RiskBadge } from "./badge"
import { icons } from "@/components/icons"
import { CheckGrid } from "./check-grid"
import { Label } from "@/components/label"

interface Props {
    visible: boolean
    security: SecurityAnalysis | null
    expectedAud: string
    setExpectedAud: (val: string) => void
    audienceMismatch: boolean
    aud: string | string[] | undefined
}

export const SecurityTab = ({
    visible,
    security,
    expectedAud,
    setExpectedAud,
    aud,
    audienceMismatch
}: Props) => {

    if (!security || !visible) return null

    return (
        <div className="rounded-lg border border-(--border) my-3 overflow-auto">
            <div className="text-xs border-b border-(--border) flex justify-between items-center gap-3 p-2 px-3">
                <span className="text-(--muted)">Security Analysis</span>
            </div>
            <div className="flex items-center gap-3 mb-2 p-2 px-3">
                <div className="text-5xl font-extrabold" style={{ color: riskColor(security.level), fontFamily: "sans-serif" }}>
                    {security.score}
                </div>
                <div className="flex-1">
                    <div className="text-(--muted) text-xs mb-1">Risk Score/100</div>
                    <div>Level: <RiskBadge level={security.level} /></div>
                </div>
                <div className="text-end">
                    <div className="text-(--muted) text-xs">Checks</div>
                    <div className="font-bold">
                        {[
                            !security.unsigned,
                            !security.noExp,
                            !security.sensitive,
                            !security.privileged,
                            !security.nested,
                            !security.oversized,
                            !security.futureIat,
                            !security.notActive,
                            !security.headerInjection,
                            !security.hasCrit]
                            .filter(Boolean).length}/10 {icons.tik}
                    </div>
                </div>
            </div>

            <div className="px-3 p-2">
                <CheckGrid
                    checks={[
                        { l: "Signed Token", ok: !security.unsigned },
                        { l: "Has Expiration", ok: !security.noExp },
                        { l: "No Sensitive Data", ok: !security.sensitive },
                        { l: "No Privileged Claims", ok: !security.privileged },
                        { l: "No Nested JWT", ok: !security.nested },
                        { l: "Normal Token Size", ok: !security.oversized },
                        { l: "Valid Issue Time", ok: !security.futureIat },
                        { l: "Token Active", ok: !security.notActive },
                        { l: "No Header Injection (jku/jwk)", ok: !security.headerInjection },
                        { l: "No Critical Extensions (crit)", ok: !security.hasCrit },
                    ]}
                />
                <div className="mt-2">
                    <Label htmlFor="expectedAud">Expected Audience (optional)</Label>
                    <input
                        type="text"
                        id="expectedAud"
                        placeholder="e.g. api.myapp.com"
                        value={expectedAud}
                        onChange={({ target }) => setExpectedAud(target.value)}
                    />
                    {expectedAud.trim() &&
                        <div
                            className={`
                                text-xs p-2 rounded-md my-2 flex items-center gap-2
                                ${audienceMismatch ? 'bg-red-300/10 text-red-300/60' : 'bg-green-300/10 text-gray-300/60'}
                            `}
                        >
                            {audienceMismatch
                                ? `${icons.caution} Audience mismatch token aud "${aud ?? "not set"}" does not match "${expectedAud.trim()}"`
                                : `${icons.tik} Audience matches "${expectedAud.trim()}"`}
                        </div>
                    }

                    {security.warnings.length > 0 &&
                        <>
                            <div className="text-xs mt-2 mb-1 text-(--muted)">Warnings ({security.warnings.length})</div>
                            {security.warnings.map((w, i) =>
                                <div
                                    key={i}
                                    className="mb-1 flex items-center gap-2 bg-amber-300/10 text-amber-300/60 rounded-md p-2 text-xs"
                                >
                                    {icons.caution} {w}
                                </div>
                            )}
                        </>
                    }

                    {security.risks.length > 0 &&
                        <>
                            <div className="text-xs mt-2 mb-1 text-(--muted)">Risks ({security.risks.length})</div>
                            {security.risks.map((r, i) =>
                                <div
                                    key={i}
                                    className="mb-1 flex items-center gap-2 bg-red-300/10 text-red-300/60 rounded-md p-2 text-xs"
                                >
                                    {icons.blocked} {r}
                                </div>
                            )}
                        </>
                    }

                    {!security.risks.length && !security.warnings.length &&
                        <div className="mt-2 text-xs text-(--muted)">{icons.tik} No issues detected</div>
                    }
                </div>
            </div>
        </div>
    )
}