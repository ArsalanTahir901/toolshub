import { ButtonHTMLAttributes } from "react"

type ButtonVariantType = "ghost" | "glow" | 'outline' | 'link'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariantType
    isActive?: boolean
    href?: string
}

type ButtonVariant = Record<ButtonVariantType, string>;


type MenuButtonProps = {
    open: boolean;
    onClick: () => void;
}

export type {
    ButtonProps,
    ButtonVariantType,
    ButtonVariant,
    MenuButtonProps
}