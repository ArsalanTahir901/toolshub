import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"

type SectionProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>

interface SectionIntroProps {
    title: string;
    gradientText: string;
    description: string
}

interface SectionTitleProps {
    icon?: ReactNode,
    title: string
    className?: string
    action?: ReactNode
}

export type {
    SectionIntroProps,
    SectionProps,
    SectionTitleProps
}