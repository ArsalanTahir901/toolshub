import { RiskLevel } from "@/types/jwt.type";
import { riskColor } from "./styles";

export const RiskBadge = ({ level }: { level: RiskLevel }) => {
    return (
        <span style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "2px 10px",
            borderRadius: 20,
            fontSize: 10,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: ".5px",
            background: `${riskColor(level)}22`, color: riskColor(level),
            border: `1px solid ${riskColor(level)}44`,
        }}>{level}</span>
    )
}