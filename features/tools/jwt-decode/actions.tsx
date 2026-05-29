import { Button } from "@/components/buttons"
import { icons } from "@/components/icons";
import { SAMPLE, SAMPLE_SECRET } from "@/utils/jwt-decoder"

interface Props {
    setToken: (sampleToken: string) => void;
    copyText: () => void;
    exportReport: () => void;
    onShare: () => void;
    onClear: () => void;
}

export const Actions = ({ onShare, onClear, setToken, copyText, exportReport }: Props) => {
    const btn = 'text-xs!'
    return (
        <div className="flex items-center gap-3 flex-wrap justify-end my-3">
            <Button
                className={btn}
                onClick={() => setToken(SAMPLE)}
                title={`Verify with secret: ${SAMPLE_SECRET}`}
            >
                {icons.copy} Sample
                <span className="text-(--muted) text-xs!">
                    (secret: {SAMPLE_SECRET})
                </span>
            </Button>
            <Button className={btn} onClick={copyText}>{icons.copy} Copy Token</Button>
            <Button className={btn} onClick={exportReport}>{icons.download} Export JSON</Button>
            <Button className={btn} onClick={onShare}>{icons.link} Share</Button>
            <Button className={btn} onClick={onClear}>{icons.cross} Clear</Button>
        </div>
    )
}