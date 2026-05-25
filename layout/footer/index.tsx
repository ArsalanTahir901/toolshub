import { icons } from "@/components/icons";
import { Link } from "@/components/link"
import { Logo } from "@/components/logo"
import { config } from "@/config"
import { footerLinks } from "@/constants/links";

export const Footer = () => {

    const { lastUpdated, siteName } = config;

    const { bottomNav, quickNav } = footerLinks;

    return (
        <footer
            aria-label="primary footer"
            className="border-t border-white/10 bg-black/20 backdrop-blur-xl px-6 py-10"
        >
            <div className="container grid grid-cols-1 md:grid-cols-2 gap-10 mx-auto">
                {/* LEFT SECTION */}
                <div className="space-y-2">
                    <Logo showContent={false} />
                    <p className="text-sm text-white/60">
                        {lastUpdated} Copyright © {siteName}
                    </p>
                </div>

                {/* RIGHT SECTION (STABLE GRID) */}
                <div className="grid grid-cols-1 min-[370px]:grid-cols-2 md:grid-cols-3 gap-8 min-w-0">
                    {quickNav.map((item) => (
                        <nav key={item.heading} className="space-y-3 min-w-0">
                            <h2 className="text-xs font-semibold uppercase tracking-wider text-white/70">
                                {item.heading}
                            </h2>

                            <ul className="space-y-2">
                                {item.links.map((link) => (
                                    <li key={link.title}>
                                        <Link
                                            variant='underline'
                                            {...link}
                                        >
                                            {link.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    ))}
                </div>
            </div>
            <div className="border border-(--border-white-soft) my-4" />
            <div className="flex items-center justify-center flex-wrap gap-8">
                {bottomNav.map((item) => (
                    <Link
                        key={item.title}
                        href={item.href}
                        variant="underline"
                        title={item.title}
                    >
                        {item.title}
                    </Link>
                ))}
            </div>
            <div className="text-center mt-4 text-(--muted) text-sm">
                © {lastUpdated} {siteName} · All tools are free to use · Built with {icons.heart}
            </div>
        </footer>
    )
}