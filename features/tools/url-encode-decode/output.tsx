import { Button } from "@/components/buttons"
import { icons } from "@/components/icons"

interface Props {
    handleCopy: (val: string) => void
    output: string
}

export const Output = ({ handleCopy, output }: Props) => {
    return (
        <div className="border border-(--border) rounded-lg p-2.5 mb-2">
            <div className="flex justify-between mb-2">
                <span>Result</span>
                <Button onClick={() => handleCopy(output)} title='Copy'>{icons.copy}</Button>
            </div>
            <pre className='wrap-break-word text-wrap'>{output}</pre>
        </div>
    )
}