import { CheckGridProps } from "@/types/jwt.type";
import { icons } from "@/components/icons";

export const CheckGrid = ({ checks }: CheckGridProps) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        {checks.map(({ l, ok }, i) => (
            <div key={i}
                className="flex items-center gap-1.5 py-1.5 px-2.5 bg-(--muted)/10 rounded-md"
            >
                <span className="text-sm">{ok ? icons.check : icons.crossRed}</span>
                <span className="text-xs text-(--muted)">{l}</span>
            </div>
        ))}
    </div>
);