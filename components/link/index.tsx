import { LinkProps, LinkVariant } from "@/types";
import NextLink from "next/link"

export const Link = ({
    href,
    title,
    onClick,
    children,
    isActive,
    className = "",
    variant = 'ghost',
    rel, target
}: LinkProps) => {

    const linkVariant: LinkVariant = {
        'ghost': `${isActive
            ? "text-white/90 bg-white/5"
            : "text-white/50 hover:text-white/90 hover:bg-white/5"}`,
        'underline': `px-0! text-white/50 hover:text-white/90 after:content-[''] after:absolute after:bottom-1 after:left-0 after:h-[1px] after:w-0 after:rounded-full after:bg-white/50  after:transition-all after:duration-300 hover:after:w-full`,
    }

    return (
        <NextLink
            href={href}
            title={title}
            rel={rel}
            target={target}
            onClick={onClick}
            className={`
                relative
                text-[13px] font-normal
                px-3 py-1.5
                rounded-lg
                no-underline
                tracking-[0.01em]
                transition-all duration-300
                ${linkVariant[variant]}
                ${className}
            `}
            aria-label={title}
        >
            {children}
        </NextLink>
    )
}