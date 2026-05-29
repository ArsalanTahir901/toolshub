import { RiskGaugeProps } from "@/types/jwt.type";
import { RiskBadge } from "./badge";
import { C, riskColor } from "./styles";

export const RiskGauge = ({ score, level }: RiskGaugeProps) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
        <span style={{ fontSize: 10, color: C.tx3 }}>Risk</span>
        <div style={{ width: 80, height: 6, background: C.b1, borderRadius: 4, overflow: "hidden" }}>
            <div style={{ width: `${score}%`, height: "100%", background: riskColor(level), borderRadius: 4, transition: "width .5s" }} />
        </div>
        <span style={{ fontSize: 11, fontWeight: 700, color: C.tx }}>{score}</span>
        <RiskBadge level={level} />
    </div>
);