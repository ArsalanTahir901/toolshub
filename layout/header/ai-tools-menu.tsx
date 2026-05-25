import { Link } from "@/components/link";
import { Popover } from "@/components/popover";
import { usePathname } from "next/navigation";

interface Props {
    fullWidth?: boolean;
}

export const AiToolsMenu = ({ fullWidth = false }: Props) => {
    const pathName = usePathname();

    const isFullWidth = fullWidth ? "block! w-full [&>a]:w-full [&>a]:block!" : '';

    return (
        <Popover
            trigger='AI Tools'
            className={isFullWidth}
            items={[{ title: 'Comming soon', href: '/' }]}
            renderItem={(item, close) => {
                return (
                    <Link
                        href={item.href}
                        onClick={close}
                        className="w-full block pointer-events-none"
                        isActive={pathName === item.href}
                    >
                        {/* <span className="w-5 inline-block">{item.icon.text}</span> */}
                        {item.title}
                    </Link>
                )
            }}
        />
    )
}