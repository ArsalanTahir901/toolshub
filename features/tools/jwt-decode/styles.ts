import { RiskLevel } from "@/types/jwt.type";

export const C = {
    bg: "#080c14", s1: "#0d1421", s2: "#111a2e", s3: "#162035",
    b1: "#1e2d4a", b2: "#243655", ac: "#3b82f6", ac2: "#60a5fa",
    tx: "#e2eaf5", tx2: "#8ca3c4", tx3: "#506079",
    green: "#22c55e", yellow: "#eab308", orange: "#f97316", red: "#ef4444",
};

export const riskColor = (l: RiskLevel) => ({
    low: C.green,
    medium: C.yellow,
    high: C.orange,
    critical: C.red
}[l] || C.green);

export const S = {
    wrap: { fontFamily: "'JetBrains Mono',monospace", background: C.bg, minHeight: "100vh", padding: "20px 14px", color: C.tx },
    inner: { maxWidth: 960, margin: "0 auto" },
    ta: { width: "100%", background: C.s1, border: `1.5px solid ${C.b1}`, borderRadius: 10, color: C.tx, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, padding: "11px 14px", resize: "vertical", minHeight: 90, outline: "none", lineHeight: 1.7 },
    inp: { width: "100%", background: C.s1, border: `1.5px solid ${C.b1}`, borderRadius: 9, color: C.tx, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, padding: "9px 13px", outline: "none" },
    btn: { display: "inline-flex", alignItems: "center", gap: 5, background: C.s2, border: `1px solid ${C.b1}`, color: C.tx2, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, padding: "7px 12px", borderRadius: 7, cursor: "pointer", whiteSpace: "nowrap" },
    btnP: { background: C.ac, borderColor: C.ac, color: "#fff", fontWeight: 700 },
    btnD: { borderColor: "#ef444444", color: C.red },
    btnOff: { opacity: 0.4, cursor: "not-allowed" },
    card: { background: C.s2, border: `1px solid ${C.b1}`, borderRadius: 8, padding: "10px 13px" },
    panel: { background: C.s1, border: `1.5px solid ${C.b1}`, borderRadius: 11, overflow: "hidden" },
    ph: { padding: "11px 15px", borderBottom: `1px solid ${C.b1}`, display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 10, color: C.tx3, textTransform: "uppercase", letterSpacing: 1 },
    pb: { padding: 16 },
    lbl: { fontSize: 10, color: C.tx3, textTransform: "uppercase", letterSpacing: 1, marginBottom: 5 },
    sec: { fontSize: 10, color: C.tx3, textTransform: "uppercase", letterSpacing: 1, margin: "14px 0 7px" },
};