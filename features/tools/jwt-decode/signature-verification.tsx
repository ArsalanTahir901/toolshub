import { Button } from "@/components/buttons";
import { icons } from "@/components/icons";
import { Label } from "@/components/label";
import { DecodedToken } from "@/types/jwt.type";
import { HMAC_ALGS } from "@/utils/jwt-decoder";

interface Props {
    visible: boolean
    verifyAlgNote: { type: string; text: string; } | null
    verifyAlg: string
    setVerifyAlg: (val: string) => void
    decoded: DecodedToken | null
    showSecret: boolean
    setShowSecret: (val: boolean) => void
    runVerify: () => void
    reset: () => void
    verifySecret: string
    setVerifySecret: (val: string) => void
    verifyResult: { type: string; msg: string; } | null
}

export const SignatureVerfication = ({
    decoded,
    verifyAlgNote,
    visible,
    setVerifyAlg,
    verifyAlg,
    showSecret,
    setShowSecret,
    runVerify,
    reset,
    setVerifySecret,
    verifySecret,
    verifyResult
}: Props) => {

    if (!visible || !verifyAlgNote) return null;

    const hasAlgo = !!decoded && HMAC_ALGS.includes(decoded.header.alg);

    const style: Record<string, string> = {
        ok: 'bg-green-300/10 border border-green-300/30 text-green-300/80',
        fail: 'bg-red-300/10 border border-red-300/30 text-red-300/80',
        unsupported: 'bg-orange-300/10 border border-orange-300/30 text-orange-300/80',
    }

    return (
        <div>
            <div className="rounded-lg border border-(--border) my-3 overflow-auto">
                <div className="text-xs border-b border-(--border) flex justify-between items-center gap-3 p-2 px-3">
                    <span className="text-(--muted)">Signature Verification</span>
                </div>
                <div className="p-2 px-3">
                    <div className="p-2 px-3 mb-2 rounded-lg text-xs text-cyan-300/60 bg-cyan-300/20 border border-(--border)">
                        <span className="text-cyan-300 text-sm! pr-1">
                            {verifyAlgNote?.type === 'warn' ? icons.caution : icons.info}
                        </span>
                        {verifyAlgNote?.text}
                    </div>
                    <div>
                        <Label htmlFor="algo">Algorithm</Label>
                        <select
                            id='algo'
                            value={verifyAlg}
                            disabled={hasAlgo}
                            onChange={e => setVerifyAlg(e.target.value)}
                            className={hasAlgo ? 'cursor-default!' : ''}
                        >
                            <option value="HS256">HS256 (HMAC SHA-256)</option>
                            <option value="HS384">HS384 (HMAC SHA-384)</option>
                            <option value="HS512">HS512 (HMAC SHA-512)</option>
                        </select>
                    </div>
                    <div className="my-2">
                        <Label htmlFor="sKey">Secret Key</Label>
                        <div className="flex gap-2 flex-wrap">
                            <input
                                id='sKey'
                                type={showSecret ? "text" : "password"}
                                className="sm:flex-1 cursor-text!"
                                placeholder="Enter HMAC secret…"
                                value={verifySecret}
                                onChange={e => setVerifySecret(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && runVerify()}
                            />
                            <Button className="text-lg" onClick={() => setShowSecret(!showSecret)}>
                                {showSecret ? icons.monkey_blind : icons.eye}
                            </Button>
                        </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        <Button variant="glow" onClick={runVerify} disabled={!verifySecret}>
                            {icons.play} Verify Signature
                        </Button>
                        <Button onClick={reset}>Reset</Button>
                    </div>
                    {verifyResult && (
                        <div className={`
                                rounded-lg py-2 px-3.5 text-xs mt-2 
                                ${style[verifyResult.type] ?? 'bg-yellow-300/10 border border-yellow-300/30 text-yellow-300/80'}
                                `}
                        >
                            {verifyResult.msg}
                        </div>
                    )}
                    <div className="p-2 px-3 my-2 rounded-lg text-xs text-cyan-300/60 bg-cyan-300/20 border border-(--border)">
                        <span className="text-cyan-300 text-sm! pr-1">{icons.info}</span>
                        Verification runs entirely in your browser using the Web Crypto API. Your secret is never sent anywhere.
                    </div>
                </div>
            </div>
        </div>
    )
}