import { ToolCategoryEnum, ToolsObject } from "@/types/tools";
import { useMemo, useState } from "react";

export const useTools = (tools: ToolsObject[]) => {
    const [search, setSearch] = useState('');
    const [active, setActive] = useState('all');

    const filteredTools = useMemo(() => {
        const query = search.trim().toLowerCase();

        return tools.filter((tool) => {
            const matchesSearch =
                !query ||
                [
                    tool.title,
                    tool.description,
                    tool.slug,
                    ...(tool.seoCategory ?? [])
                ]
                    .join(' ')
                    .toLowerCase()
                    .includes(query);

            const matchesTab =
                active === 'all' ||
                tool.seoCategory?.includes(active as ToolCategoryEnum);

            return matchesSearch && matchesTab;
        });
    }, [search, active, tools]);

    const tabs = useMemo(() => {
        const categories = [
            ...new Set(
                tools.flatMap(tool => tool.seoCategory ?? [])
            )
        ];

        return [
            { label: 'All', value: 'all' },
            ...categories.map(category => ({
                label: category,
                value: category
            }))
        ];
    }, [tools]);

    return {
        setSearch,
        setActive,
        filteredTools,
        tabs,
        search,
        active
    }
}