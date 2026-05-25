'use client'
import { icons } from "@/components/icons"
import { ToolCard } from "@/components/tool-card"
import Link from "next/link"
import { GoogleAd } from '@/components/google-ad'
import { ToolsObject } from "@/types/tools"
import { Tab } from "../tab"
import { useTools } from "./useTools"

export const Tools = ({ tools }: { tools: ToolsObject[] }) => {

    const {
        filteredTools,
        setActive,
        setSearch,
        tabs,
        active,
        search
    } = useTools(tools);

    return (
        <>
            <div className="my-5 flex gap-2 justify-between flex-wrap sm:items-center">
                <input
                    id='tools-search-input'
                    type="text"
                    placeholder="Search tools..."
                    value={search}
                    autoFocus
                    className="max-w-64"
                    onChange={({ target }) => setSearch(target.value)}
                />
                <Tab
                    data={tabs}
                    activeVal={active}
                    onClick={(val) => { setActive(val) }}
                    className="capitalize text-sm!"
                />
            </div>
            <div className="grid grid-cols-1 min-[640px]:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredTools.length ? filteredTools.map((tool) => (
                    <Link key={tool.slug} href={tool.href}>
                        <ToolCard
                            heading={tool.title}
                            description={tool.description}
                            icon={tool.icon}
                            tag={tool.tag}
                            className="h-full"
                        />
                    </Link>
                )) :
                    <ToolCard
                        heading='No such tool found'
                        icon={{ text: icons.magnify, className: 'icon-red' }}
                    />
                }
            </div>
            <GoogleAd />
        </>
    )
}