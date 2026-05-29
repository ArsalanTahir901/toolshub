import { icons } from "@/components/icons";
import { DecodedToken } from "@/types/jwt.type";

interface Props {
    decoded: DecodedToken | null
}

export const Chart = ({ decoded }: Props) => {
    if (!decoded) return null;

    return (
        <details style={{ marginTop: 10 }}>
            <summary
                className="cursor-pointer text-xs py-2 list-none flex gap-5 items-center select-none"
            >{icons.chevronDown}
                Claims Distribution Chart
            </summary>
            <div className="border border-(--border) rounded-md p-3">
                <div
                    className="text-xs uppercase mb-2.5"
                >
                    Numeric = actual value · String = length · Other = 1
                </div>
                {(() => {
                    const entries = Object.entries(decoded.payload).map(([k, v]) => ({
                        k,
                        val: typeof v === "number"
                            ? v : typeof v === "string"
                                ? v.length : 1
                    }));
                    const maxV = Math.max(...entries.map(e => e.val), 1);
                    return entries.map(({ k, val }, i) => (
                        <div key={i}
                            className="flex items-center gap-2 mb-1.5"
                        >
                            <div
                                className="text-[10px] min-w-17.5 text-right overflow-hidden text-ellipsis whitespace-nowrap"
                                title={k}
                            >
                                {k}
                            </div>
                            <div
                                className="flex-1 h-4 rounded-md overflow-hidden"
                            >
                                <div
                                    style={{
                                        width: `${Math.max(2, (val / maxV) * 100)}%`,
                                        height: "100%",
                                        background: `linear-gradient(90deg, #3b82f6, #60a5fa)`,
                                        borderRadius: 4,
                                        transition: "width .5s"
                                    }}
                                />
                            </div>
                            <div
                                className="text-[10px] min-w-4.5"
                            >
                                {val}
                            </div>
                        </div>
                    ));
                })()}
            </div>
        </details>
    )
}