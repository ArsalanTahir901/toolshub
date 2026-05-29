import { icons } from "@/components/icons";
import { TimeAnalysis } from "@/types/jwt.type";

interface Props {
    visible: boolean
    time: TimeAnalysis | null
}

export const TimeTab = ({ visible, time }: Props) => {

    if (!visible || !time) return null;

    const style: Record<string, string> = {
        ok: 'bg-green-300/10 border border-green-300/30',
        bad: 'bg-red-300/10 border border-red-300/30',
        warn: 'bg-yellow-300/10 border border-yellow-300/30',
    }

    return (
        <div className="rounded-lg border border-(--border) my-3 overflow-auto">
            <div className="text-xs border-b border-(--border) flex justify-between items-center gap-3 p-2 px-3">
                <span className="text-(--muted)">Time Analysis</span>
            </div>
            <div className="p-2 px-3">
                <div className="text-xs text-(--muted) mb-1">Standard Claims</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {[
                        {
                            l: "Status",
                            v: time.expired
                                ? `${icons.high} Expired`
                                : !time.hasExp
                                    ? `${icons.wraningLevel} No Expiration`
                                    : time.notActive
                                        ? `${icons.quarter} Not Active Yet`
                                        : `${icons.low} Active`,
                            sub: time.human ??
                                (!time.hasExp ? "Token never expires" : ""),
                            cls: time.expired
                                ? "bad" : !time.hasExp
                                    ? "warn" : "ok"
                        },
                        {
                            l: "Issued At (iat)",
                            v: time.issuedAt || "--",
                            sub: time.iat ? "Unix: " + time.iat : ""
                        },
                        {
                            l: "Expires At (exp)",
                            v: time.expAt || "--",
                            sub: time.exp ? "Unix: " + time.exp : "No exp claim",
                            cls: time.expired ? "bad" : ""
                        },
                        {
                            l: "Not Before (nbf)",
                            v: time.notBefore || "--",
                            sub: time.nbf ? "Unix: " + time.nbf : "No nbf claim"
                        },
                    ].map(({ l, v, sub, cls }, i) => (
                        <div key={i}
                            className={`
                                    py-1.5 px-2.5 rounded-md
                                    ${cls ? style[cls] : 'bg-(--muted)/10 border border-(--muted)/30'}
                                `}
                        >
                            <div className="text-[9px] text-(--muted)/80 uppercase">{l}</div>
                            <div className="text-xs font-medium my-1">{v}</div>
                            {sub && <div className="text-[10px] text-(--muted)">{sub}</div>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}