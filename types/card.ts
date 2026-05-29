import { ReactNode } from "react";
import { Children_Type } from ".";
import { BadgeVariantType } from "./badge";

interface CardAnchorProps {
    href: string;
    icon?: string;
    title?: string;
    subtitle?: string;
    disabled?: boolean;
    className?: string;
    contentClassName?: string;
    titleClassName?: string;
    badge?: { text: string, variant: BadgeVariantType };
    subtitleClassName?: string;
}

interface CardProps extends Children_Type {
    heading?: string
    className?: string;
}


interface ToolCardContent {
    text?: string;
    className?: string
    variant?: BadgeVariantType
}

interface ToolCardProps {
    id?: string;
    slug?: string;
    icon?: ToolCardContent
    tag?: ToolCardContent
    heading?: string
    title?: string
    description?: ReactNode
    children?: ReactNode
    stats?: string[]
    textarea?: React.ComponentProps<'textarea'>
    input?: React.ComponentProps<'input'>
    footer?: ReactNode
    className?: string
    defaultOpen?: boolean
}

export type {
    CardAnchorProps,
    CardProps,
    ToolCardProps,
    ToolCardContent
}