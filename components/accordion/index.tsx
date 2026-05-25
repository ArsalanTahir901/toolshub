'use client'

import { useRef } from "react"
import { Link } from "../link"
import { useClickOutside } from "@/utils/useOutsideClick"
import { AccordionProps } from "@/types/accordion"
import { icons } from "../icons"

export const Accordion = <T,>({
    title = "Tools",
    items = [],
    renderItem,
}: AccordionProps<T>) => {

    const ref = useRef<HTMLDivElement>(null);

    const { isActive, toggle } = useClickOutside({ ref });

    return (
        <div ref={ref} className={`w-full overflow-hidden border rounded-lg ${isActive ? 'border-(--border)' : 'border-transparent'}`}>
            {/* Header */}
            <Link
                href='#'
                onClick={(e) => { e.preventDefault(); toggle() }}
                aria-expanded={isActive}
                isActive={isActive}
                className={`block w-full ${isActive ? 'rounded-none' : ''}`}
            >
                {title} {isActive ? icons.chevronUp : icons.chevronDown}
            </Link>

            {/* Content */}
            <div
                className={`
                    grid transition-all duration-300 ease-in-out
                    ${isActive
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }
                `}
            >
                <div className="overflow-hidden">
                    <ul className="flex flex-col gap-1 border-t border-(--border) p-2!">
                        {items.map((item, i) => (
                            <li key={i}>
                                {renderItem(item, () => toggle())}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}