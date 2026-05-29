import { Button } from "@/components/buttons"
import { icons } from "@/components/icons"
import { Label } from "@/components/label"
import { DiffResult } from "@/types/jwt.type"

interface Props {
    visible: boolean
    diffA: string
    setDiffA: (val: string) => void
    diffB: string
    setDiffB: (val: string) => void
    runDiff: () => void
    clear: () => void
    token: string
    diffResult: {
        header?: DiffResult | undefined;
        payload?: DiffResult;
        error?: string;
    } | null
}

export const DiffTab = ({ visible, diffA, diffB, setDiffA, setDiffB, runDiff, token, clear, diffResult }: Props) => {

    const trimmedToken = token.trim();

    if (!visible || !trimmedToken) return null


    const style: Record<string, string> = {
        added: 'bg-green-300/10 border border-green-300/30 text-green-300/80',
        removed: 'bg-red-300/10 border border-red-300/30 text-red-300/80',
        // changed: 'bg-orange-300/10 border border-orange-300/30 text-orange-300/80',
    }

    return (
        <div className="rounded-lg border border-(--border) my-3 overflow-auto">
            <div className="text-xs border-b border-(--border) flex justify-between items-center gap-3 p-2 px-3">
                <span className="text-(--muted)">Token Diff Comparator</span>
            </div>
            <div className="p-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                    <div>
                        <Label htmlFor="tokenA">Token A</Label>
                        <textarea
                            id='tokenA'
                            placeholder="Paste first JWT..."
                            className="max-h-20!"
                            value={diffA}
                            onChange={({ target }) => setDiffA(target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="tokenB">Token B</Label>
                        <textarea
                            id='tokenB'
                            className="max-h-20!"
                            placeholder="Paste second JWT..."
                            value={diffB}
                            onChange={({ target }) => setDiffB(target.value)}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    <Button variant="glow" onClick={runDiff}>{icons.compare}Compare</Button>
                    <Button
                        disabled={!trimmedToken}
                        onClick={() => trimmedToken && setDiffA(trimmedToken)}
                        title={trimmedToken ? "Use current decoded token as A" : "Decode a token first"}
                    >
                        ← Use Current as A
                    </Button>
                    <Button onClick={clear}>{icons.cross} Clear</Button>
                </div>
                {diffResult &&
                    <div className="mt-2">
                        {diffResult.error ?
                            <div className="p-2 px-3 mb-2 rounded-lg text-xs text-red-300/60 bg-red-300/10 border border-red-300/30">
                                <span className="text-red-300 text-sm! pr-1">
                                    {icons.caution}
                                </span>
                                {diffResult?.error}
                            </div> :
                            <>
                                {["header", "payload"].map(section => {
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    const d: any = diffResult[section as keyof typeof diffResult];
                                    const keys = Object.keys(d || {});
                                    return (
                                        <div
                                            key={section}
                                            className="mb-2"
                                        >
                                            <div className="text-[10px] uppercase text-(--muted) my-2.5 mr-3">
                                                {section.toUpperCase()} -
                                                {keys.length ? `${keys.length} difference(s)` : `Identical ${icons.tik}`}
                                            </div>
                                            {keys.length === 0 && <div className="text-[10px] text-green-300/80">{icons.tik} No differences</div>}
                                            {keys.map((k, i) => {
                                                const { tokenA, tokenB } = d[k];
                                                const cls = tokenA === undefined
                                                    ? "added" : tokenB === undefined
                                                        ? "removed" : "changed";
                                                return (
                                                    <div
                                                        key={i}
                                                        className={`
                                                            flex items-start gap-2 py-2 px-2.5 rounded-lg mb-1 text-xs
                                                            ${style[cls]}
                                                            `}
                                                    >
                                                        <span className="text-xs">
                                                            {cls === "added" ? icons.plus : cls === "removed" ? icons.minus : icons.recycle}
                                                        </span>
                                                        <span className="text-(--muted) font-bold" style={{ minWidth: 80 }}>{k}</span>
                                                        <span style={{ color: "#7dd3fc" }}>A: {JSON.stringify(tokenA)}</span>
                                                        <span className="text-(--muted)">→</span>
                                                        <span style={{ color: "#86efac" }}>B: {JSON.stringify(tokenB)}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                                <div className="text-[10px] text-(--muted)">
                                    Signature comparison omitted (always differs between tokens)
                                </div>
                            </>
                        }
                    </div>}
            </div>
        </div>
    )
}