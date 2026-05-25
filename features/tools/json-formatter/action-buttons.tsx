import { Button } from "@/components/buttons"
import { icons } from "@/components/icons";
import { Spinner } from "@/components/skeletons/spinner"

interface Props {
    format: () => void;
    minify: () => void;
    validate: () => void;
    clear: () => void;
    isProcessing: boolean;
}

export const ActionButtons = ({ format, isProcessing, clear, minify, validate }: Props) => {
    return (
        <div className="w-full flex flex-wrap gap-2">
            <Button
                variant="glow"
                onClick={format}
                disabled={isProcessing}
                className="flex-1"
            >
                {isProcessing ? <Spinner /> : `${icons.zap} Format`}
            </Button>

            <Button
                variant="glow"
                onClick={minify}
                disabled={isProcessing}
                className="flex-1"
            >
                {isProcessing ? <Spinner /> : `${icons.minify} Minify`}
            </Button>

            <Button
                onClick={validate}
                disabled={isProcessing}
                className="flex-1"
            >
                {isProcessing ? <Spinner /> : `${icons.check} Validate`}
            </Button>

            <Button
                onClick={clear}
                disabled={isProcessing}
            >
                {icons.bin}
            </Button>
        </div>
    )
}