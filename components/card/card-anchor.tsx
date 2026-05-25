import Link from "next/link"
import { Badge } from "../badge";
import { CardAnchorProps } from "@/types/card";

export const CardAnchor = ({
    href,
    icon,
    subtitle,
    title,
    disabled,
    className = '',
    contentClassName = '',
    titleClassName = '',
    subtitleClassName = '',
    badge
}: CardAnchorProps) => {
    const base = 'relative flex items-start gap-3.5 bg-(--surface) border border-(--border) rounded-[10px] p-4 no-underline text-(--text) transition-all duration-200 hover:border-(--accent) hover:shadow-(--glow)';
    const disable = disabled ? 'opacity-50 pointer-events-none cursor-not-allowed' : ''
    return (
        <Link
            href={href}
            className={`${base} ${disable} ${className}`}
        >
            <span className="shrink-0 text-2xl">{icon}</span>
            <div className={contentClassName}>
                {title &&
                    <strong
                        className={`block text-sm text-(--accent) font-semibold mb-0.75 ${titleClassName}`}
                    >
                        {title}
                    </strong>}
                {subtitle && <p className={`text-(--muted) text-xs m-0 ${subtitleClassName}`}>{subtitle}</p>}
            </div>
            {!!badge &&
                <Badge
                    title={badge.text}
                    variant={badge.variant}
                    className="uppercase absolute top-2 right-2"
                    dot={false}
                />}
        </Link>
    )
}