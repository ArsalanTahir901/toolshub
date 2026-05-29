import { Button } from "@/components/buttons"
import { icons } from "@/components/icons"

interface Props {
    baseUrl: string
    setBaseUrl: (val: string) => void
    keyVal: string
    setKey: (val: string) => void
    value: string
    setValue: (val: string) => void
    addParam: () => void
    params: { key: string, value: string }[]
    removeParam: (idx: number) => void
    builtUrl: string
    handleCopy: (val: string) => void
}

export const UrlBuilder = ({
    baseUrl,
    setBaseUrl,
    keyVal,
    setKey,
    addParam,
    setValue,
    value,
    params,
    removeParam,
    builtUrl,
    handleCopy
}: Props) => {
    return (
        <div className="border border-(--border) rounded-lg p-2.5 space-y-3 my-2.5">
            <h3>URL Builder</h3>

            <input
                type='text'
                value={baseUrl}
                onChange={e => setBaseUrl(e.target.value)}
                placeholder="Base URL"
            />

            <div className="flex gap-2">
                <input
                    type='text'
                    value={keyVal}
                    onChange={e => setKey(e.target.value)}
                    placeholder="Key"
                />
                <input
                    type='text'
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder="Value"
                />
                <Button onClick={addParam}>Add</Button>
            </div>

            {params.length ? <table className="w-full table-auto border-collapse border-(--border)">
                <thead>
                    <tr>
                        <th className="border border-(--border) p-2 text-left">
                            Key
                        </th>
                        <th className="border border-(--border) p-2 text-left">
                            Value
                        </th>
                        <th className="border border-(--border) p-2 text-center">
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {params.map((p, i) => (
                        <tr key={i} className="text-(--muted)">
                            <td className="border border-(--border) p-2 break-all">
                                {p.key}
                            </td>

                            <td className="border border-(--border) p-2 break-all">
                                {p.value}
                            </td>

                            <td className="border border-(--border) p-2 text-center">
                                <Button
                                    onClick={() => removeParam(i)}
                                    className="px-2! py-1!"
                                >
                                    {icons.cross}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> : null}

            {builtUrl && (
                <div>
                    <span className='text-(--muted)'>Built url</span>
                    <div className='wrap-break-word text-wrap my-2'>{builtUrl}</div>
                    <Button onClick={() => handleCopy(builtUrl)}>
                        Copy URL
                    </Button>
                </div>
            )}
        </div>
    )
}