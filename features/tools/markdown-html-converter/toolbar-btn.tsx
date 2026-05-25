import { Button } from "@/components/buttons"

interface Props {
    label: string
    title: string
    onClick: () => void
    kbd?: string
    disabled?: boolean
}

export const ToolbarBtn = ({ label, title, onClick, kbd, disabled, }: Props) => (
    <Button
        type="button"
        onClick={onClick}
        disabled={disabled}
        title={kbd ? `${title} (${kbd})` : title}
        aria-label={title}
        className="text-sm px-2! py-1! size-8"
        variant="outline"
    >
        {label}
    </Button>
)