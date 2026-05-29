// Constants

export type Algorithm =
    | "HS256" | "HS384" | "HS512"    // HMAC (verifiable in-browser)
    | "RS256" | "RS384" | "RS512"    // RSA PKCS#1 v1.5
    | "PS256" | "PS384" | "PS512"    // RSA-PSS
    | "ES256" | "ES384" | "ES512"    // ECDSA
    | "EdDSA"                        // EdDSA (Ed25519 / Ed448)
    | "none" | 'NONE';                        // Unsigned — security risk

export type RiskLevel = "low" | "medium" | "high" | "critical";

export type TabId =
    | "decoded"
    | "security"
    | "claims"
    | "time"
    | "verify"
    | "metadata"
    | "search"
    | "diff";

// Token structure

/** Decoded JWT header — only alg/typ/kid are standard; anything else is an extension */
export interface JwtHeader {
    alg: Algorithm;
    typ?: string;          // Usually "JWT"
    kid?: string;          // Key ID — used to look up the right public key
    cty?: string;          // Content type (e.g. "JWT" for nested tokens)
    x5t?: string;          // X.509 Certificate SHA-1 Thumbprint
    x5u?: string;          // X.509 Certificate URL
    jku?: string;          // JWK Set URL — potential SSRF vector
    jwk?: Record<string, unknown>;  // Embedded JWK — potential key confusion attack
    [key: string]: unknown;
    crit?: string[];
}

/** Standard registered claims per RFC 7519 §4.1 */
export interface JwtStandardClaims {
    iss?: string;          // Issuer
    sub?: string;          // Subject
    aud?: string | string[]; // Audience
    exp?: number;          // Expiration time (Unix seconds)
    nbf?: number;          // Not Before (Unix seconds)
    iat?: number;          // Issued At (Unix seconds)
    jti?: string;          // JWT ID
}

/** JWT payload = standard claims + arbitrary custom claims */
export type JwtPayload = JwtStandardClaims & Record<string, unknown>;

/** The three decoded segments of a JWT */
export interface DecodedToken {
    header: JwtHeader;
    payload: JwtPayload;
    encodedHeader: string;    // Original base64url-encoded header
    encodedPayload: string;   // Original base64url-encoded payload
    signature: string;        // Raw base64url signature (third segment)
}

// decodeJwt() return

export type DecodeResult =
    | { success: true; error: null; token: DecodedToken }
    | { success: false; error: string; token: null };

// analyzeSecurity() return

export interface SecurityAnalysis {
    score: number;          // 0–100 composite risk score
    level: RiskLevel;
    warnings: string[];     // Human-readable warning messages
    risks: string[];        // Human-readable risk descriptions

    // Individual boolean flags (used for CheckGrid & score arithmetic)
    unsigned: boolean;      // alg === "none"
    noExp: boolean;         // exp claim absent
    sensitive: boolean;     // Sensitive key detected in payload
    privileged: boolean;    // Privileged claim/value detected
    nested: boolean;        // Nested JWT string found in payload
    oversized: boolean;     // token.length > 50 000
    futureIat: boolean;     // iat > now
    notActive: boolean;     // nbf > now

    headerInjection: boolean;
    hasCrit: boolean;
    dangerousHeaderKeys: string[];
}

// analyzeTime() return

export interface TimeAnalysis {
    hasExp: boolean;
    expired: boolean;
    notActive: boolean;     // nbf > now
    futureIat: boolean;     // iat > now
    remaining: number | null;          // Seconds until expiry (negative = already expired)
    human: string | null;              // "2h 15m remaining" | "Expired 3d ago"
    expAt: string | null;              // Formatted locale string
    issuedAt: string | null;
    notBefore: string | null;
    exp: number | null;                // Raw Unix timestamp
    iat: number | null;
    nbf: number | null;
}

// analyzeClaims() return

export interface ClaimsAnalysis {
    standard: JwtStandardClaims; // Keyed by STD_CLAIMS
    custom: Record<string, unknown>;   // All non-standard claims
    missing: string[];                 // Standard claims absent from token
    hints: string[];                   // Actionable advice strings
}

// getMetadata() return

export interface TokenMetadata {
    algorithm: string | null;
    tokenType: string | null;
    keyId: string | null;
    contentType: string | null;
    size: number;
    headerSize: number;
    payloadSize: number;
    signatureSize: number;
    claimCount: number;
    customClaimCount: number;
    cookieSafe: boolean;   // size <= 4096
}

// searchClaims() return

export interface SearchResult {
    key: string;
    value: unknown;
    path: string;          // Dot-notation path e.g. "permissions[0]"
}

// diffJwt() return

export interface DiffEntry {
    tokenA: unknown;
    tokenB: unknown;
}

export type DiffResult = Record<string, DiffEntry>;

export interface TokenDiff {
    header: DiffResult;
    payload: DiffResult;
}

// verifyHMAC() return

export interface VerifyResult {
    verified: boolean;
    reason: string;
}

// UI-only types

export type VerifyResultType =
    | "ok"
    | "fail"
    | "none"
    | "error"
    | "loading"
    | "unsupported";

export interface VerifyUIResult {
    type: VerifyResultType;
    msg: string;
}

export interface DiffUIResult {
    error?: string;
    header?: DiffResult;
    payload?: DiffResult;
}

export interface ToastState {
    show: boolean;
    msg: string;
    type: "ok" | "bad";
}

export interface Tab {
    id: TabId;
    label: string;
}

export interface CheckItem {
    l: string;    // Label
    ok: boolean;  // Pass / fail
}

// Sub-component prop types

export interface JsonBlockProps {
    data: unknown;
}

export interface RiskGaugeProps {
    score: number;
    level: RiskLevel;
}

export interface CheckGridProps {
    checks: CheckItem[];
}