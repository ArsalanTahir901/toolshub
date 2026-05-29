import { Algorithm, ClaimsAnalysis, DecodedToken, DecodeResult, DiffResult, JwtHeader, JwtPayload, JwtStandardClaims, SearchResult, SecurityAnalysis, TimeAnalysis, TokenMetadata } from "@/types/jwt.type";

export const SAMPLE = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImtleS0wMDEifQ.eyJzdWIiOiJ1c2VyXzEyMyIsIm5hbWUiOiJBbGkgQWhtYWQiLCJlbWFpbCI6ImFsaUBleGFtcGxlLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxNjAwMDAwMCwiZXhwIjo5OTk5OTk5OTk5LCJpc3MiOiJteWFwcC5jb20iLCJhdWQiOiJhcGkubXlhcHAuY29tIiwianRpIjoidG9rZW4teHl6LTQ1NiIsImRlcGFydG1lbnQiOiJlbmdpbmVlcmluZyIsInBlcm1pc3Npb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfQ.JEDEmkFNL02LTpHqLfLeNMkmRBiFq-DfXrQlKeag3_4";
export const SAMPLE_SECRET = "sample-secret-key";

export const SENSITIVE_KEYS = [
    "password", "passwd", "pwd", "secret", "clientsecret", "client_secret", "apikey", "api_key",
    "privatekey", "private_key", "access_token", "refreshtoken", "refresh_token", "token", "credential",
    "credentials", "auth", "authorization", "bearer", "session", "cookie"];

export const PRIVILEGED_KEYS = ["admin", "root", "superuser", "isadmin", "is_admin", "administrator",
    "owner", "system", "sudo", "godmode", "staff", "super_admin"];

export const PRIVILEGED_VALUES = [true, "true", "admin", "root", "owner", "superuser"];

export const STD_CLAIMS = ["iss", "sub", "aud", "exp", "iat", "nbf", "jti"];

export const HMAC_ALGS = ["HS256", "HS384", "HS512"];

export const ASYMMETRIC_ALGS = ["RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384", "ES512", "EdDSA"];

export const DANGEROUS_HEADER_KEYS = ["jku", "jwk", "x5u", "x5c"];

export type StandardClaimKey = typeof STD_CLAIMS[number];

// decode

export function b64urlDecode(s: string): string {
    const n = s.replace(/-/g, "+").replace(/_/g, "/");
    const p = n + (n.length % 4 ? "=".repeat(4 - n.length % 4) : "");
    return atob(p);
}

export function decodeJwt(token: string): DecodeResult {
    try {
        const t = token.trim();
        if (!t) {
            return {
                success: false,
                error: "Empty token",
                token: null
            }
        };
        const parts = t.split(".");
        if (parts.length !== 3) {
            return {
                success: false,
                error: "JWT must have exactly 3 segments (header.payload.signature)",
                token: null
            }
        };
        const [eh, ep, sig] = parts;
        const header = JSON.parse(b64urlDecode(eh));
        const payload = JSON.parse(b64urlDecode(ep));
        return {
            success: true,
            error: null,
            token: {
                header,
                payload,
                encodedHeader: eh,
                encodedPayload: ep,
                signature: sig
            }
        };
    } catch (e) {
        return {
            success: false,
            error: e instanceof Error ? e.message : "Invalid JWT",
            token: null
        };
    }
}


// security
export function analyzeSecurity(
    token: string,
    payload: JwtPayload,
    header: JwtHeader
): SecurityAnalysis {
    const unsigned = header?.alg === "none" || header?.alg === "NONE";
    const noExp = typeof payload.exp !== "number";
    const sensitive = Object.keys(payload).map(k => k.toLowerCase()).some(k => SENSITIVE_KEYS.includes(k));
    const privileged = Object.entries(payload).some(([k, v]) => {
        if (PRIVILEGED_KEYS.includes(k.toLowerCase())) return true;
        if (typeof v === "string" || typeof v === "boolean") return PRIVILEGED_VALUES.includes(v);
        return false;
    });
    const nested = Object.values(payload).some(v => typeof v === "string" && /^eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(v));
    const oversized = token.length > 50000;
    const now = Math.floor(Date.now() / 1000);
    const futureIat = typeof payload.iat === "number" && payload.iat > now;
    const notActive = typeof payload.nbf === "number" && payload.nbf > now;

    // detect dangerous header injection fields (jku, jwk, x5u, x5c)
    const dangerousHeaderKeys = DANGEROUS_HEADER_KEYS.filter(k => header?.[k] !== undefined);
    const headerInjection = dangerousHeaderKeys.length > 0;

    // detect crit (critical extensions) header
    const hasCrit = Array.isArray(header?.crit) && header.crit.length > 0;

    let score = 0;
    if (unsigned) score += 40; if (noExp) score += 20; if (sensitive) score += 20;
    if (privileged) score += 20; if (nested) score += 15; if (oversized) score += 10;
    if (futureIat) score += 10; if (notActive) score += 10;
    if (headerInjection) score += 30; if (hasCrit) score += 15;
    score = Math.min(score, 100);

    const level = score <= 24 ? "low" : score <= 49 ? "medium" : score <= 74 ? "high" : "critical";
    const warnings = [], risks = [];
    if (unsigned) {
        warnings.push("Token not signed (alg: none)");
        risks.push("Cryptographic integrity not guaranteed");
    }
    if (noExp) {
        warnings.push("No expiration claim (exp)");
        risks.push("Token may remain valid indefinitely");
    }
    if (sensitive) {
        warnings.push("Sensitive data detected in payload");
        risks.push("Storing secrets in JWT is unsafe");
    }
    if (privileged) {
        warnings.push("Privileged claims detected");
        risks.push("Token may grant elevated access");
    }
    if (nested) {
        warnings.push("Nested JWT detected in payload");
        risks.push("Token may contain chained credentials");
    }
    if (oversized) {
        warnings.push("Token is unusually large (>50KB)");
        risks.push("May exceed cookie/header limits");
    }
    if (futureIat) {
        warnings.push("Token issued in the future");
        risks.push("Possible clock skew or tampering");
    }
    if (notActive) {
        warnings.push("Token not yet active (nbf in future)");
    }
    if (headerInjection) {
        warnings.push(`Dangerous header field(s): ${dangerousHeaderKeys.join(", ")}`);
        risks.push("jku/jwk/x5u/x5c can enable key confusion or SSRF attacks");
    }
    if (hasCrit) {
        warnings.push(`Critical extensions header (crit): [${header?.crit?.join(", ")}]`);
        risks.push("crit header can force unrecognised extension processing");
    }

    return {
        score, level, warnings, risks,
        unsigned, noExp, sensitive, privileged, nested, oversized, futureIat, notActive,
        headerInjection, hasCrit, dangerousHeaderKeys,
    };
}

// analyze time
export function analyzeTime(payload: JwtPayload): TimeAnalysis {
    const now = Math.floor(Date.now() / 1000);
    const exp = typeof payload.exp === "number" ? payload.exp : null;
    const iat = typeof payload.iat === "number" ? payload.iat : null;
    const nbf = typeof payload.nbf === "number" ? payload.nbf : null;
    const hasExp = exp !== null;
    const expired = hasExp && exp <= now;
    const notActive = nbf !== null && nbf > now;
    const futureIat = iat !== null && iat > now;
    const remaining = hasExp ? exp - now : null;
    const fmt = (ts: number | null) => ts ? new Date(ts * 1000).toLocaleString() : null;
    function humanTime(sec: number | null) {
        if (sec === null) return null;
        const a = Math.abs(sec), d = Math.floor(a / 86400), h = Math.floor((a % 86400) / 3600), m = Math.floor((a % 3600) / 60), s = a % 60;
        const p = []; if (d) p.push(d + "d"); if (h) p.push(h + "h"); if (m) p.push(m + "m"); if (s) p.push(s + "s");
        const v = p.join(" ") || "0s";
        return sec < 0 ? "Expired " + v + " ago" : v + " remaining";
    }
    return { hasExp, expired, notActive, futureIat, remaining, human: humanTime(remaining), expAt: fmt(exp), issuedAt: fmt(iat), notBefore: fmt(nbf), exp, iat, nbf };
}

// analyze claims
export function analyzeClaims(payload: JwtPayload): ClaimsAnalysis {
    const missing: string[] = [];
    ["iss", "sub", "aud", "exp", "iat"].forEach(k => { if (!payload[k]) missing.push(k); });
    const standard: JwtStandardClaims = Object.fromEntries(
        STD_CLAIMS.map((k) => [k, payload[k]])
    ) as JwtStandardClaims;
    const custom = Object.fromEntries(Object.entries(payload).filter(([k]) => !STD_CLAIMS.includes(k)));
    const hints = [];
    if (!payload.exp) hints.push("No expiration claim");
    if (!payload.iss) hints.push("Missing issuer (iss)");
    if (!payload.aud) hints.push("Missing audience (aud)");
    if (!payload.sub) hints.push("Missing subject (sub)");
    return { standard, custom, missing, hints };
}

// meta data
export function getMetadata(token: string, decoded: DecodedToken): TokenMetadata {
    const { header, payload, encodedHeader, encodedPayload, signature } = decoded;
    return {
        algorithm: header.alg || null, tokenType: header.typ || null,
        keyId: header.kid || null, contentType: header.cty || null,
        size: token.trim().length, headerSize: encodedHeader.length,
        payloadSize: encodedPayload.length, signatureSize: signature.length,
        claimCount: Object.keys(payload).length,
        customClaimCount: Object.keys(payload).filter(k => !STD_CLAIMS.includes(k)).length,
        cookieSafe: token.trim().length <= 4096,
    };
}

// search claims
export function searchClaims(payload: JwtPayload, query: string): SearchResult[] {
    const results: SearchResult[] = [];
    if (!query.trim()) return results;
    const q = query.toLowerCase();
    function walk(val: unknown, path: string) {
        if (val === null || val === undefined || typeof val !== "object") return;
        if (Array.isArray(val)) { val.forEach((v, i) => walk(v, `${path}[${i}]`)); return; }
        Object.entries(val).forEach(([k, v]) => {
            const cp = path ? `${path}.${k}` : k;
            if (k.toLowerCase().includes(q) || String(v).toLowerCase().includes(q))
                results.push({ key: k, value: v, path: cp });
            walk(v, cp);
        });
    }
    walk(payload, "");
    return results;
}


// stable stringify
export function stableStringify(val: unknown): string {
    if (val === null || typeof val !== "object") return JSON.stringify(val);
    if (Array.isArray(val)) return "[" + val.map(stableStringify).join(",") + "]";
    const entries = Object.entries(val as Record<string, unknown>).sort(([a], [b]) => a.localeCompare(b));
    return `{${entries
        .map(([key, value]) => `${JSON.stringify(key)}:${stableStringify(value)}`)
        .join(",")}}`;
}

// diff jwt
export function diffJwt(a: Record<string, unknown>, b: Record<string, unknown>): DiffResult {
    const diff: DiffResult = {};
    const keys = new Set([...Object.keys(a || {}), ...Object.keys(b || {})]);
    keys.forEach(k => {
        if (stableStringify(a?.[k]) !== stableStringify(b?.[k]))
            diff[k] = { tokenA: a?.[k], tokenB: b?.[k] };
    });
    return diff;
}

// verify HMAC
export async function verifyHMAC(token: string, secret: string, alg: Algorithm) {

    const algMap = { HS256: "SHA-256", HS384: "SHA-384", HS512: "SHA-512", };
    const hashAlg = algMap[alg as keyof typeof algMap];
    if (!hashAlg) return { verified: false, reason: "Unsupported algorithm" };
    try {
        const parts = token.trim().split(".");
        if (parts.length !== 3) return { verified: false, reason: "Invalid token structure" };
        const [h, p, sig] = parts;
        const data = new TextEncoder().encode(`${h}.${p}`);
        const keyData = new TextEncoder().encode(secret);
        const cryptoKey = await crypto.subtle.importKey("raw", keyData, { name: "HMAC", hash: hashAlg }, false, ["sign"]);
        const signed = await crypto.subtle.sign("HMAC", cryptoKey, data);
        const b64 = btoa(String.fromCharCode(...new Uint8Array(signed))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
        return { verified: b64 === sig, reason: b64 === sig ? "Signature valid" : "Signature mismatch" };
    } catch (e) { return { verified: false, reason: e instanceof Error ? e.message : "Verification failed" }; }
}