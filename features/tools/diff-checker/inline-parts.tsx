import { DiffPart } from "@/utils/diff-checker";

export const InlineParts = ({ parts }: { parts: DiffPart[] }) => (
    <>
        {parts.map((p, i) => (
            <span
                key={i}
                className={
                    p.type === "insert" ? "bg-green-500/40 text-green-200 rounded-sm" :
                        p.type === "delete" ? "bg-red-500/40 text-red-200 rounded-sm" :
                            "text-foreground"
                }
            >
                {p.value}
            </span>
        ))}
    </>
)