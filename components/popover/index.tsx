'use client'
import { useRef } from "react"
import { Link } from "../link"
import { PopoverProps } from "@/types/popover";
import { getAriaLabel } from "@/utils";
import { useClickOutside } from "@/utils/useOutsideClick";
import { icons } from "../icons";

export const Popover = <T,>({
    items,
    triggerVariant,
    trigger,
    renderItem,
    className = ''
}: PopoverProps<T>) => {

    const popoverRef = useRef<HTMLDivElement>(null);

    const { toggle, isActive } = useClickOutside({ ref: popoverRef });

    return (
        <div
            ref={popoverRef}
            aria-label={getAriaLabel(trigger)}
            title={getAriaLabel(trigger)}
            className={`relative inline-block ${className}`}
        >
            <Link
                href="#"
                onClick={(e) => {
                    e.preventDefault()
                    toggle()
                }}
                isActive={isActive}
                variant={triggerVariant}
            >
                {trigger} {isActive ? icons.chevronUp : icons.chevronDown}
            </Link>
            {isActive &&
                <div className="absolute z-9999 left-0 right-0 bg-(--card) rounded-(--radius) mt-2 p-2 border border-(--border) w-max max-h-80 overflow-auto">
                    <ul className="space-y-1">
                        {items.map((item, i) => (
                            <li key={i}>
                                {renderItem(item, toggle)}
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    )
}