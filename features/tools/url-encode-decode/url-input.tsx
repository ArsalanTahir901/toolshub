import { Label } from "@/components/label"

interface Props {
    live: boolean;
    setLive: (val: boolean) => void
    value: string;
    setValue: (val: string) => void
}

export const UrlInput = ({ live, setLive, setValue, value }: Props) => {
    return (
        <div className="my-2">
            <div className='text-end'>
                <Label htmlFor='live-convert' className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                        id='live-convert'
                        type="checkbox"
                        checked={live}
                        onChange={() => setLive(!live)}
                    />
                    Live Convert
                </Label>
            </div>
            <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter text or URL..."
            />
        </div>
    )
}