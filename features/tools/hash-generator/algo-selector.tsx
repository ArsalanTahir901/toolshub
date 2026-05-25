import { Button } from "@/components/buttons"
import { icons } from "@/components/icons"
import { HashAlgorithm, InputMode } from "@/utils/hash-generator"

interface Props {
    algorithms: HashAlgorithm[]
    inputMode: InputMode
    selected: HashAlgorithm[]
    toggleAlgorithm: (algo: HashAlgorithm) => void;
}

export const AlgoSelector = ({ algorithms, inputMode, selected, toggleAlgorithm }: Props) => {
    return (
        <div className="w-full flex flex-col gap-2 mb-3">
            <span className="text-sm text-(--muted)">
                Algorithms:
            </span>

            <div className="flex flex-wrap gap-2">
                {algorithms.map((algo) => {
                    const disabled = inputMode === "file" && algo === "MD5"
                    return (
                        <Button
                            key={algo}
                            onClick={() =>
                                !disabled &&
                                toggleAlgorithm(algo)
                            }
                            disabled={disabled}
                            isActive={selected.includes(algo)}
                            className="text-xs"
                        >
                            {algo}
                            {disabled && icons.notAllowed}
                        </Button>
                    )
                })}
            </div>
        </div>
    )
}