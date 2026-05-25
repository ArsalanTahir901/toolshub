import { Section } from "@/components/section"
import { SectionTitle } from "@/components/section-title"
import { toolsArray } from "@/features/tools/registry"
import Link from "next/link"
import { ToolCard } from "@/components/tool-card"
import { icons } from "@/components/icons"
import { Button } from "@/components/buttons"
import { paths } from "@/constants"

export const PopularTools = () => {
    return (
        <Section aria-label="Online Tools">
            <SectionTitle
                icon={icons.ranch}
                title="Popular Tools"
                action={<Button href={paths.tools.href}>All Tools →</Button>}
            />
            <div className="grid grid-cols-1 min-[640px]:grid-cols-2 xl:grid-cols-3 gap-5">
                {toolsArray.slice(0, 6).map((tool) => (
                    <Link key={tool.slug} href={tool.href}>
                        <ToolCard
                            heading={tool.title}
                            description={tool.description}
                            icon={tool.icon}
                            tag={tool.tag}
                            className="h-full"
                        />
                    </Link>
                ))}
            </div>
        </Section>
    )
}