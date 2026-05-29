import { Button } from "@/components/buttons"
import { icons } from "@/components/icons"

interface Props {
    visible: boolean;
    url: string;
    copyText: (url: string) => void;
    clear: () => void;
}

export const ShareUrl = ({ copyText, clear, url, visible }: Props) => {
    if (!visible) return null;
    return (
        <div className="flex sm:items-center gap-2 my-3 flex-col sm:flex-row">
            <input type="text" readOnly value={url} id='share-url' className="flex-1" />
            <Button className="text-xs!" onClick={() => copyText(url)}>{icons.copy} Copy</Button>
            <Button className="text-xs!" onClick={clear}>{icons.cross}</Button>
        </div>
    )
}