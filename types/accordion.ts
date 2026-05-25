import { ReactNode } from "react";

type AccordionItem = {
    label: string
    href?: string
    onClick?: () => void;
    id?: string;
}

interface AccordionProps<T,> {
    title?: string
    items?: T[];
    renderItem: (item: T, close: () => void) => ReactNode
}

export type {
    AccordionItem,
    AccordionProps
}