import { ReactNode } from "react";
import { LinkVariantType } from ".";

export interface PopoverProps<T> {
    items: T[]
    trigger: ReactNode
    triggerVariant?: LinkVariantType
    renderItem: (item: T, close: () => void) => ReactNode
    className?:string
}