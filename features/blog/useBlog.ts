import { toolsBlogArticles } from "@/features/blog/registry";
import { toolsArray } from "@/features/tools/registry";
import { ToolCategoryEnum } from "@/types/tools";
import { useMemo, useState } from "react";

export const useBlog = () => {
    const [search, setSearch] = useState("")
    const [active, setActive] = useState('all');

    const filteredTools = useMemo(() => {
        const query = search.toLowerCase().trim()

        return toolsArray.filter((tool) => {
            const blog = toolsBlogArticles[tool.slug]

            const matchesSearch =
                !query ||
                blog.title.toLowerCase().includes(query) ||
                blog.metaDescription.toLowerCase().includes(query) ||
                tool.title.toLowerCase().includes(query)

            const matchesCategory =
                active === "all" ||
                tool.seoCategory?.includes(active as ToolCategoryEnum)

            return matchesSearch && matchesCategory
        })
    }, [search, active])

    const tabs = useMemo(() => {
        const categories = [
            ...new Set(
                toolsArray.flatMap(tool => tool.seoCategory ?? [])
            )
        ];

        return [
            { label: 'All', value: 'all' },
            ...categories.map(category => ({
                label: category,
                value: category
            }))
        ];
    }, []);

    return {
        search,
        setSearch,
        active,
        setActive,
        tabs, 
        filteredTools
    }
}