import { Badge } from "@/components/badge"
import { DecodedToken, SecurityAnalysis, TimeAnalysis } from "@/types/jwt.type"
import { RiskGauge } from "./risk-guage"

interface Props {
    time: TimeAnalysis | null
    decoded: DecodedToken | null
    token: string
    security: SecurityAnalysis | null
}

export const Statusbar = ({ time, decoded, token, security }: Props) => {

    if (!decoded) return null;

    return (
        <div className="flex text-xs items-center gap-3 flex-wrap rounded-lg bg-background/40 py-2 px-3 my-2">
            <Badge
                variant={time?.expired ? 'danger' : 'success'}
                title={time?.expired ? "Expired" : "Valid"}
            />
            <span className="w-px h-3.5 bg-(--muted)" />
            <span className="text-white/60">
                {time?.hasExp ? (time?.expired ? "⌛ Expired" : (time?.human ?? "--")) : "∞ No Expiry"}
            </span>
            <span className="w-px h-3.5 bg-(--muted)" />
            <span className="text-white/60">alg: {decoded.header.alg || "?"}</span>
            <span className="w-px h-3.5 bg-(--muted)" />
            <span className="opacity-70 text-white/60">{token.trim().length} chars</span>
            {security && <RiskGauge score={security.score} level={security.level} />}
        </div>
    )
}