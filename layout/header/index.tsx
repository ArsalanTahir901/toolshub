"use client"

import { Badge } from "@/components/badge"
import { Button } from "@/components/buttons"
import { MenuButton } from "@/components/buttons/menu-button"
import { Link } from "@/components/link"
import { Logo } from "@/components/logo"
import { headerLinks } from "@/constants/links"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { ToolsMenu } from "./tools-menu"
import { MobileDrawer } from "./mobile-drawer"
import { AiToolsMenu } from "./ai-tools-menu"

export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathName = usePathname();

    return (
        <header className='sticky top-0 h-16 z-9999' aria-label="Primary header">
            {/* Layered background */}
            <div className=" absolute inset-0 backdrop-blur-[20px] backdrop-saturate-180 bg-[rgba(6,4,16,0.72)] border-b border-white/6 transition-[background,border-color] duration-400" />
            {/* <div className=" absolute inset-0 backdrop-blur-xl backdrop-saturate-150 bg-black/70 border-b border-white/10 transition-all duration-300" /> */}

            <div className="flex items-center justify-between gap-10 h-full px-6">
                {/* Logo */}
                <Logo />

                {/* Desktop Nav */}
                <nav aria-label="Primary navigation" className="hidden flex-1 md:flex relative z-1">
                    <ul className="flex items-center gap-1 list-none m-0 p-0">
                        <ToolsMenu />
                        <AiToolsMenu />
                        {headerLinks.map((item) => (
                            <li key={item.title}>
                                <Link
                                    href={item.href}
                                    title={item.title}
                                    isActive={pathName === item.href}
                                >
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* ── Desktop CTA ── */}
                <div className="hidden lg:flex items-center relative z-1 gap-2.5">
                    {/* Live badge */}
                    <Badge title='Free to use' />
                    <Button>Sign in</Button>
                    <Button variant="glow">Get Started</Button>
                </div>

                {/* ── Mobile Hamburger ── */}
                <MenuButton open={false} onClick={() => setMenuOpen(true)} />
            </div>

            {/* ── Mobile drawer ── */}
            {menuOpen && (
                <MobileDrawer pathName={pathName} onClose={() => setMenuOpen(false)} />
            )}
        </header>
    )
}