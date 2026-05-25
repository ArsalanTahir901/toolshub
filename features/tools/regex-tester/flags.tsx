import { Badge } from "@/components/badge";
import { Button } from "@/components/buttons";
import { Label } from "@/components/label";
import { FLAG_INFO, RegexFlag } from "@/utils/regex-tester";

interface Props {
    flags: RegexFlag[]
    toggleFlag: (flag: RegexFlag) => void;
    hasMatches: boolean;
    matchCount: number;
    noMatch: boolean;
}

export const Flags = ({ flags, toggleFlag, hasMatches, matchCount, noMatch }: Props) => {
    return (
        <div id="flags" className="w-full flex flex-wrap items-center gap-2 mb-2">
            <div className="flex items-center gap-2 flex-1">
                <Label htmlFor="flags" className="shrink-0">Flags:</Label>
                {FLAG_INFO.map(({ flag, label, desc }) => {
                    const active = flags.includes(flag as RegexFlag);
                    return (
                        <Button
                            key={flag}
                            onClick={() => toggleFlag(flag as RegexFlag)}
                            title={desc}
                            aria-pressed={active}
                            isActive={active}
                            variant="outline"
                            className="px-2.5! py-1!"
                        >
                            {label}
                        </Button>
                    );
                })}
            </div>
            {hasMatches &&
                <Badge
                    variant="success"
                    dot={false}
                    title={`${matchCount} match${matchCount !== 1 ? "es" : ""}`}
                />}

            {noMatch && (
                <Badge variant="danger" dot={false} title='No matches' />
            )}
        </div>
    )
}