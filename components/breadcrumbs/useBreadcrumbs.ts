import { PathConstantKeyEnum, paths } from "@/constants";
import { toolsConstant } from "@/features/tools/registry";
import { ToolsConstantKeyEnums } from "@/types/tools";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

type BreadcrumbItem = {
    label: string;
    href: string;
    icon?: string;
};


interface ReturnType {
    items: BreadcrumbItem[]
    isMatched: boolean
}

const toTitleCase = (str: string) =>
    str
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

export const useBreadcrumbs = (): ReturnType => {
    const pathname = usePathname();

    const items = useMemo(() => {
        if (pathname === "/") return [];

        const segments = pathname.split("/").filter(Boolean);

        return segments.map((segment, index) => {
            const href = "/" + segments.slice(0, index + 1).join("/");
            const mapped = paths[segment as PathConstantKeyEnum];
            const toolsIcon = toolsConstant[segment as ToolsConstantKeyEnums]?.icon?.text;

            return {
                label: mapped?.title ?? toTitleCase(segment),
                icon: toolsIcon ?? mapped?.icon?.text ?? "📄",
                href,
            };
        });
    }, [pathname]);

    const isMatched = pathname === paths.tools.href || pathname === paths.blog.href;

    return {
        items,
        isMatched
    }
};