import { Link } from "@/components/link";
import { Popover } from "@/components/popover";
import { toolsArray } from "@/features/tools/registry";
import { usePathname } from "next/navigation";

interface Props {
    fullWidth?: boolean;
}

export const ToolsMenu = ({ fullWidth = false }: Props) => {
    const pathName = usePathname();

    const isFullWidth = fullWidth ? "block! w-full [&>a]:w-full [&>a]:block!" : '';

    return (
        <Popover
            trigger='Tools'
            className={isFullWidth}
            items={toolsArray}
            renderItem={(item, close) => {
                return (
                    <Link
                        href={item.href}
                        onClick={close}
                        className="w-full block"
                        isActive={pathName === item.href}
                        title={item.title}
                    >
                        <span className="w-5 inline-block">{item.icon.text}</span>
                        {item.title}
                    </Link>
                )
            }}
        />
    )
}