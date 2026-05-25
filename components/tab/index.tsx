
interface Props {
    onClick: (val: string) => void
    activeVal: string
    data: { label: string, value: string, title?: string, icon?: string }[]
    className?: string;
}

export const Tab = ({ activeVal, data, onClick, className = '' }: Props) => {
    return (
        <div className="flex items-center gap-1 flex-wrap p-1 rounded-xl bg-(--muted)/10 w-fit">
            {data.map(({ value, label, title, icon }) => (
                <button
                    key={value}
                    onClick={() => onClick(value)}
                    title={title}
                    className={`px-3 cursor-pointer py-1 rounded-lg text-xs font-medium transition-all duration-200 
                        ${activeVal === value
                            ? "bg-(--card) text-foreground shadow-sm"
                            : "text-(--muted) hover:text-foreground"
                        } ${className}`}
                >
                    {icon && icon} {label}
                </button>
            ))}
        </div>
    )
}