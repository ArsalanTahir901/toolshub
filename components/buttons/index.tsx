"use client";

import Link from "next/link";
import type { ButtonProps, ButtonVariant } from "@/types/button";

export const Button = ({
    variant = "ghost",
    className = "",
    isActive = false,
    href,
    ...props
}: ButtonProps) => {
    const btnVariant: ButtonVariant = {
        ghost:
            `text-white/60 bg-transparent border border-white/10 ${isActive
                ? "text-white! border-white/20 bg-white/5"
                : "hover:text-white hover:border-white/20 hover:bg-white/5"
            }`,

        glow:
            "overflow-hidden text-white rounded-[9px] border-transparent tracking-[0.01em] transition-all duration-200 bg-gradient-to-r from-violet-600 to-sky-500 shadow-[0_0_0_1px_rgba(139,92,246,0.4),0_4px_16px_rgba(124,58,237,0.35),inset_0_1px_0_rgba(255,255,255,0.1)] hover:-translate-y-[1px] hover:shadow-[0_0_0_1px_rgba(139,92,246,0.6),0_8px_24px_rgba(124,58,237,0.5),inset_0_1px_0_rgba(255,255,255,0.15)]",

        outline: `border border-(--border) text-(--accent) ${isActive
                ? "bg-(--bg-accent-strong) border-(--accent)!"
                : "hover:bg-(--bg-accent-strong) hover:border-(--accent)"
            }`,

        link:
            "bg-transparent text-(--accent) hover:underline px-0 py-0 rounded-none",
    };

    const base =
        "cursor-pointer relative text-sm font-normal rounded-lg px-4 py-2 transition-all duration-300";

    const disabled = props.disabled
        ? "pointer-events-none opacity-70"
        : "";

    const classes = `${base} ${btnVariant[variant]} ${disabled} ${className}`;

    // Render Next Link when href exists
    if (href) {
        return (
            <Link
                href={href}
                className={classes}
            >
                {props.children}
            </Link>
        );
    }

    return (
        <button
            className={classes}
            {...props}
        />
    );
};