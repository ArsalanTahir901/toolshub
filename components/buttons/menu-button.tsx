import { MenuButtonProps } from "@/types/button";

export const MenuButton = ({ onClick, open }: MenuButtonProps) => {
    return (
        <button
            onClick={onClick}
            aria-label={open ? "Close menu" : "Open menu"}
            className="
                md:hidden
                flex flex-col gap-1.25
                bg-transparent
                border-0
                cursor-pointer
                p-1.5
                relative z-10
            "
        >
            {/* Top line */}
            <span
                className={`
                    block w-5.5 h-[1.5px]
                    rounded-full
                    bg-white/60
                    transition-all duration-300
                    origin-center
                    ${open ? "rotate-45 translate-y-1.5" : ""}
                `}
            />

            {/* Middle line */}
            <span
                className={`
                    block w-5.5 h-[1.5px]
                    rounded-full
                    bg-white/60
                    transition-all duration-300
                    ${open ? "opacity-0 scale-x-0" : "opacity-100"}
                `}
            />

            {/* Bottom line */}
            <span
                className={`
                    block w-5.5 h-[1.5px]
                    rounded-full
                    bg-white/60
                    transition-all duration-300
                    origin-center
                    ${open ? "-rotate-45 -translate-y-1.5" : ""}
                `}
            />
        </button>
    );
};