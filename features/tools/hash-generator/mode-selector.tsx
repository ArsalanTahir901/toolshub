import { Button } from "@/components/buttons"
import { icons } from "@/components/icons";
import { InputMode } from "@/utils/hash-generator";

interface Props {
    mode: InputMode;
    onModeChange: (type: InputMode) => void
}

export const ModeSelector = ({ mode, onModeChange }: Props) => {
    return (
        <div className="flex flex-wrap gap-2 mb-3">
            <Button
                variant={mode === "text" ? "glow" : "ghost"}
                onClick={() => onModeChange("text")}
                className="flex-1"
                disabled={mode === "text"}
            >
                {icons.checkList} Text
            </Button>

            <Button
                variant={mode === "file" ? "glow" : "ghost"}
                onClick={() => onModeChange("file")}
                className="flex-1"
                disabled={mode === "file"}
            >
                {icons.folder} File
            </Button>
        </div>
    )
}