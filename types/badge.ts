import { ReactNode } from "react"

type BadgeVariantType = "default" | "success" | "warning" | "danger" | "info" | "premium";

type BadgeVariant = Record<BadgeVariantType, string>

interface BadgeProps {
    title?: ReactNode
    variant?: BadgeVariantType
    dot?: boolean
    className?: string
}


export type {
    BadgeVariantType,
    BadgeVariant,
    BadgeProps
}