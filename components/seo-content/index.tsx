import { getFilteredToolsArray } from "@/features/tools/registry"
import { Section } from "../section"
import { thirdPartyPaths } from "@/constants"
import { ButtonList } from "../buttons/button-lists"
import { SectionTitle } from "../section-title"
import { SeoContentType } from "@/seo/seo-content"
import { ToolsConstantKeyEnums } from "@/types/tools"
import { JsonLd } from "@/seo/schemas/json-ld"
import { generateFAQSchema } from "@/seo/schemas/generate-faq-schema"
import { marked } from "marked"
import DOMPurify from "isomorphic-dompurify"

interface Props {
    content: SeoContentType | null
    slug: ToolsConstantKeyEnums
}

const List = ({ items, title }: { title: string, items: string[] }) => {
    return (
        <section className="space-y-4">
            <h2 className="text-lg font-semibold">
                {title}
            </h2>

            <ul className="space-y-2">
                {items.map((item) => (
                    <li
                        key={item}
                        className="text-(--muted) leading-relaxed pl-4 border-l border-white/10"
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </section>
    )
}

const renderMarkdown = (content: string) => {
    const html = marked.parse(content, { async: false }) as string;
    return DOMPurify.sanitize(html);
}

export const SeoContent = ({ content, slug }: Props) => {

    if (!content) return null;

    const tools = getFilteredToolsArray(slug)

    return (
        <>
            <Section className="p-0! mt-10">
                <ButtonList
                    heading="More Tools"
                    list={tools.map((item) => ({
                        icon: item?.icon?.text,
                        title: item.title,
                        href: `/tools/${item.slug}`
                    }))}
                />
                <article
                    itemScope
                    itemType={thirdPartyPaths.itemType.href}
                    className="space-y-10 mt-10"
                >
                    <SectionTitle className='' title="About this Tool" />
                    {/* WHAT IS IT */}
                    <header className="space-y-3">
                        <div
                            itemProp="name"
                            className="text-xl font-semibold tracking-tight"
                            dangerouslySetInnerHTML={{ __html: renderMarkdown(content.whatIsIt) }}
                        />

                        <div
                            itemProp='description'
                            className="text-(--muted) leading-relaxed text-base"
                            dangerouslySetInnerHTML={{ __html: renderMarkdown(content.intro) }}
                        />
                    </header>

                    {/* HOW TO USE */}
                    <List title="How to use" items={content.howToUse} />

                    {/* BENEFITS */}
                    <List title="Benefits" items={content.benefits} />

                    <section className="space-y-4">
                        <h2 className="text-lg font-semibold">FAQs</h2>
                        {content.faq.map((item, i) => (
                            <details key={item.question + i}>
                                <summary className="cursor-pointer leading-relaxed">{item.question}</summary>
                                <p className="pl-4 mt-2 text-(--muted)">{item.answer}</p>
                            </details>
                        ))}
                    </section>

                </article>
            </Section>
            <JsonLd
                id={`${slug}-faq-schema`}
                data={generateFAQSchema(content.faq)}
            />
        </>
    )
}
