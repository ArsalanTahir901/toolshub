import { icons } from "@/components/icons";
import { Algorithm, ClaimsAnalysis, DecodedToken, DecodeResult, DiffResult, SearchResult, SecurityAnalysis, Tab, TimeAnalysis, TokenMetadata } from "@/types/jwt.type";
import { copyToClipboard } from "@/utils";
import { analyzeClaims, analyzeSecurity, analyzeTime, ASYMMETRIC_ALGS, decodeJwt, diffJwt, getMetadata, HMAC_ALGS, searchClaims, verifyHMAC } from "@/utils/jwt-decoder";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

export const useJwtDecode = () => {
    const [token, setToken] = useState("");
    const [tab, setTab] = useState("decoded");
    const [verifySecret, setVerifySecret] = useState("");
    const [verifyAlg, setVerifyAlg] = useState("HS256");
    const [showSecret, setShowSecret] = useState(false);
    const [verifyResult, setVerifyResult] = useState<{ type: string, msg: string } | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [diffA, setDiffA] = useState("");
    const [diffB, setDiffB] = useState("");
    const [diffResult, setDiffResult] = useState<{ header?: DiffResult, payload?: DiffResult, error?: string } | null>(null);
    const [showShare, setShowShare] = useState(false);
    // expected audience input for mismatch detection
    const [expectedAud, setExpectedAud] = useState("");


    const raw = useMemo<DecodeResult | null>(() => token.trim() ? decodeJwt(token) : null, [token]);
    const decoded: DecodedToken | null = raw?.success ? raw.token : null;
    const security = useMemo<SecurityAnalysis | null>(() => decoded ? analyzeSecurity(token, decoded.payload, decoded.header) : null, [token, decoded]);
    const time = useMemo<TimeAnalysis | null>(() => decoded ? analyzeTime(decoded.payload) : null, [decoded]);
    const claims = useMemo<ClaimsAnalysis | null>(() => decoded ? analyzeClaims(decoded.payload) : null, [decoded]);
    const meta = useMemo<TokenMetadata | null>(() => decoded ? getMetadata(token, decoded) : null, [token, decoded]);
    const searchResults = useMemo<SearchResult[]>(() => decoded && searchQuery ? searchClaims(decoded.payload, searchQuery) : [], [decoded, searchQuery]);

    // audience mismatch detection derived from expectedAud + decoded payload
    const audienceMismatch = useMemo(() => {
        if (!expectedAud.trim() || !decoded) return false;
        const aud = decoded.payload.aud;
        if (!aud) return true;
        const audList = Array.isArray(aud) ? aud : [aud];
        return !audList.includes(expectedAud.trim());
    }, [expectedAud, decoded]);

    const TABS: Tab[] = [
        { id: "decoded", label: `${icons.code} Decoded` },
        { id: "security", label: `${icons.lockkey} Security` },
        { id: "claims", label: `${icons.tag} Claims` },
        { id: "time", label: `${icons.clock} Time` },
        { id: "verify", label: `${icons.check} Verify` },
        { id: "metadata", label: `${icons.info} Meta` },
        { id: "search", label: `${icons.magnify} Search` },
        { id: "diff", label: `${icons.difference} Diff` },
    ];


    const exportReport = useCallback(() => {
        if (!decoded) {
            // notify("Decode a token first", "bad");
            return;
        }
        const data = { generatedAt: new Date().toISOString(), decodedToken: decoded, security, time, claims, metadata: meta };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a"); a.href = url; a.download = "jwt-analysis.json";
        document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
        // notify("Report exported ✓");
    }, [decoded, security, time, claims, meta]);


    // gate verify on algorithm type — asymmetric algs not verifiable in-browser
    const runVerify = useCallback(async () => {
        if (!decoded) {
            setVerifyResult({ type: "error", msg: "Decode a token first" }); return;
        }
        if (!verifySecret.trim()) { setVerifyResult({ type: "error", msg: "Enter a secret key" }); return; }
        const alg = decoded.header.alg;
        if (alg === "none" || alg === "NONE") {
            setVerifyResult({ type: "none", msg: "Token uses alg:none — unsigned, no signature to verify" });
            return;
        }
        if (ASYMMETRIC_ALGS.includes(alg)) {
            setVerifyResult({
                type: "unsupported",
                msg: `ℹ ${alg} uses a public/private key pair. In-browser HMAC verification is not possible for this algorithm. Use your server-side JWT library with the corresponding public key instead.`,
            });
            return;
        }
        // Resolve effective HMAC alg: prefer token's own alg claim over the dropdown
        const effectiveAlg = HMAC_ALGS.includes(alg) ? alg : verifyAlg;
        setVerifyResult({ type: "loading", msg: "Verifying…" });
        const res = await verifyHMAC(token, verifySecret, effectiveAlg as Algorithm);
        setVerifyResult(res.verified
            ? { type: "ok", msg: `✅ Signature Valid — verified using ${effectiveAlg}` }
            : { type: "fail", msg: `❌ Invalid Signature — ${res.reason}` });
    }, [decoded, token, verifySecret, verifyAlg]);

    const runDiff = useCallback(() => {
        if (!diffA.trim() || !diffB.trim()) { setDiffResult({ error: "Paste both tokens" }); return; }
        const ra = decodeJwt(diffA);
        const rb = decodeJwt(diffB);
        if (!ra.success) { setDiffResult({ error: "Token A: " + ra.error }); return; }
        if (!rb.success) { setDiffResult({ error: "Token B: " + rb.error }); return; }
        setDiffResult({
            header: diffJwt(ra.token.header, rb.token.header),
            payload: diffJwt(ra.token.payload, rb.token.payload)
        });
    }, [diffA, diffB]);

    const shareUrl = useMemo(() => {
        if (!token.trim()) return "";
        try {
            const enc = btoa(encodeURIComponent(token.trim()));
            const url = new URL(window.location.href); url.searchParams.set("t", enc);
            return url.toString();
        } catch { return ""; }
    }, [token]);

    const verifyAlgNote = decoded ? (() => {
        const alg = decoded.header.alg;
        if (!alg || alg === "none") return null;
        if (ASYMMETRIC_ALGS.includes(alg)) return {
            type: "warn",
            text: `Token uses ${alg} (asymmetric). Paste-based HMAC verification is not applicable verify server-side with the public key.`
        };
        if (HMAC_ALGS.includes(alg)) return { type: "info", text: `Token alg is ${alg} - using it instead of the dropdown selection.` };
        return { type: "warn", text: `Unknown algorithm "${alg}". Falling back to dropdown selection.` };
    })() : null;


    // load token from ?t= share URL param on mount
    useEffect(() => {
        try {
            const params = new URLSearchParams(window.location.search);
            const t = params.get("t");
            if (t) {
                const decoded = atob(t);
                const restored = decodeURIComponent(decoded);
                // eslint-disable-next-line react-hooks/set-state-in-effect
                if (restored.trim()) setToken(restored.trim());
            }
        } catch {
            // malformed share URL — silently ignore
        }
    }, []);

    const handleClear = () => {
        setToken("");
        setVerifyResult(null);
        setDiffResult(null);
        setSearchQuery("");
        setExpectedAud("");
    }

    const onShare = () => {
        if (decoded) setShowShare(s => !s);
        else toast.error('Decode a token first')
    }

    const copyText = (value: string, successMsg?: string) => {
        copyToClipboard({ value, successMsg })
    }


    return {
        token, setToken,
        tab, setTab,
        verifySecret, setVerifySecret,
        verifyAlg, setVerifyAlg,
        showSecret, setShowSecret,
        verifyResult, setVerifyResult,
        searchQuery, setSearchQuery,
        diffA, setDiffA,
        diffB, setDiffB,
        diffResult, setDiffResult,
        showShare, setShowShare,
        expectedAud, setExpectedAud,
        security, raw, decoded,
        searchResults,
        audienceMismatch,
        TABS,
        exportReport,
        verifyAlgNote,
        runVerify,
        runDiff,
        shareUrl, time, claims, meta,
        handleClear,
        onShare,
        copyText
    }
}