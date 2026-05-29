import { Button } from "@/components/buttons"

interface Props {
    onClearHistory: () => void
    history: { input: string, output: string }[]
}

export const History = ({ history, onClearHistory }: Props) => {

    if (!history.length) return null;

    return (
        <div className="border border-(--border) rounded-lg p-2.5 mt-2.5">
            <div className='flex items-center gap-2 flex-wrap mb-2'>
                <h3>History</h3>
                <Button onClick={onClearHistory} className='px-2! text-xs'>Clear history</Button>
            </div>
            {history.map((h, i) => (
                <div key={i} className={`space-y-2 text-sm opacity-90 border-b border-(--border) break-all py-1`}>
                    <div>{h.input}</div>
                    <div>{h.output}</div>
                </div>
            ))}
        </div>
    )
}