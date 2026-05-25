import { config } from "@/config"
import Link from "next/link"
import { paths } from "@/constants";
import { icons } from "../icons";
import './style.css'

export const Logo = ({ showContent = true }: { showContent?: boolean }) => {
    const { siteName } = config;

    return (
        <Link
            href={paths.home.href}
            title={siteName}
            className="flex items-center gap-2.75 decoration-0 relative z-1"
        >
            <div className="logo-ring">
                <div className="logo-inner">
                    <span className="logo-glyph">{icons.zap}</span>
                </div>
            </div>

            {showContent && <div
                className="flex flex-col leading-none"
            >
                <span className="wordmark">{siteName}</span>
                <span className="eyebrow">AI Utilities</span>
            </div>}
        </Link>
    )
}