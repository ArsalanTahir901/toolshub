import { Badge } from "@/components/badge"
import { Button } from "@/components/buttons"
import { MenuButton } from "@/components/buttons/menu-button"
import { Link } from "@/components/link"
import { headerLinks } from "@/constants/links"
import { ToolsMenu } from "./tools-menu"

interface MobileDrawerProps {
    onClose: () => void;
    pathName: string;
}

export const MobileDrawer = ({ onClose, pathName }: MobileDrawerProps) => {

    return (
        <div className="fixed inset-0 z-9999 h-screen w-full overflow-hidden">
            <div
                className="fixed top-0 right-0 h-screen overflow-auto w-80 max-w-[85vw] flex flex-col space-y-1
    bg-black/80 border  backdrop-blur-3xl border-l border-white/10
    shadow-2xl shadow-black/50 p-5 z-9999
    translate-x-0 transition-transform duration-300 ease-out"
                role="dialog"
                aria-label="Mobile navigation"
            >
                <div className="flex items-center justify-between gap-2">
                    <MenuButton open onClick={onClose} />
                    <Badge title='Free to use' />
                </div>

                <div className="flex flex-col gap-1">
                    <ToolsMenu fullWidth />
                    {headerLinks.map((item) => (
                        <Link
                            key={item.title}
                            href={item.href}
                            isActive={pathName === item.href}
                            onClick={onClose}
                            className="w-full rounded-lg text-base"
                        >
                            {item.title}
                        </Link>
                    ))}
                </div>

                <div className="h-px my-1 bg-linear-to-r from-transparent via-white/15 to-transparent" />

                <div className="mt-auto flex flex-col gap-3 pt-4">
                    <Button className="w-full">Sign in</Button>
                    <Button className="w-full" variant="glow">
                        Get Started
                    </Button>
                </div>
            </div>
        </div>
    )
}