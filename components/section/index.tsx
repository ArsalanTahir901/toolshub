import { SectionProps } from "@/types/section"

export const Section = ({
    children,
    className = "",
    ...props
}: SectionProps) => {
    return (
        <section
            className={`w-full p-6 ${className}`}
            {...props}
        >
            {children}
        </section>
    )
}