import type { BadgeProps, BadgeVariant } from "@/types/badge"
import './style.css'

const variants: BadgeVariant = {
    default: "text-white/60 bg-white/5 border-white/10",
    success: "text-green-300 bg-green-500/10 border-green-500/20",
    warning: "text-yellow-300 bg-yellow-500/10 border-yellow-500/20",
    danger: "text-red-300 bg-red-500/10 border-red-500/20",
    info: "text-blue-300 bg-blue-500/10 border-blue-500/20",
    premium: "text-violet-300 bg-violet-500/10 border-violet-500/20",
}

const dotColors: BadgeVariant = {
    default: "bg-white/60",
    success: "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]",
    warning: "bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.6)]",
    danger: "bg-red-400 shadow-[0_0_8px_rgba(251,113,133,0.6)]",
    info: "bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]",
    premium: "bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.6)]",
}

export const Badge = ({
    title,
    variant = "default",
    dot = true,
    className = "",
}: BadgeProps) => {
    return (
        <span
            className={`pointer-events-none inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border tracking-[0.03em] backdrop-blur-md ${variants[variant]} ${className}`}
        >
            {dot && (
                <span className={`w-1.25 h-1.25 rounded-full ${dotColors[variant]} animate-pulse-soft`} />
            )}
            {title}
        </span>
    )
}