import { CardProps } from "@/types/card"

export const Card = ({ children, heading, className = '' }: CardProps) => {

const base = "bg-(--card) border border-(--border) transition:all duration-200 hover:border-(--bg-accent-glow-2) hover:shadow-(--glow) hover:-translate-y-[3px] rounded-(--radius) p-10 max-[600px]:py-6 max-[600px]:px-[18px]"
return (
    <div className={`${base} ${className}`}>
        {heading &&
            <h2 className="text-xl font-bold mb-3 text-(--text)">
                {heading}
            </h2>
        }
        {children}
    </div>
)
}