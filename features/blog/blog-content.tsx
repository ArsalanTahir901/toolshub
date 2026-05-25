import { Card } from "@/components/card"
import { GoogleAd } from "@/components/google-ad"
import { thirdPartyPaths } from "@/constants"
import { BlogArticleType } from "@/types"
import { marked } from "marked"
import DOMPurify from "isomorphic-dompurify"
import { ButtonList } from "@/components/buttons/button-lists"
import { filteredBlogsArray } from "./registry"

const renderMarkdown = (content: string) => {
    const html = marked.parse(content, { async: false }) as string;
    return DOMPurify.sanitize(html);
}

export const BlogContent = ({ blog }: { blog: BlogArticleType }) => {
    return (
        <>
            <Card heading={blog.title} className="mb-6">
                <p className="text-(--muted)">
                    {blog.metaDescription}
                </p>
                <div className="my-3 flex items-center gap-2 justify-between flex-wrap text-xs text-(--muted)">
                    <div className="flex items-center gap-2 flex-wrap">
                        {blog.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full px-3 py-1 capitalize text-xs bg-(--muted)/5 border border-(--border)"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <p className="text-sm text-(--muted)">
                        Last updated
                        <span className="ml-2 text-foreground font-medium">
                            {blog.publishedAt}
                        </span>
                    </p>
                </div>

                <article
                    id={blog.slug}
                    itemScope
                    itemType={thirdPartyPaths.itemType.href}
                    className="prose prose-invert max-w-none prose-p:text-(--muted) prose-p:leading-8 prose-p:my-4 prose-headings:text-foreground prose-headings:font-semibold prose-strong:text-foreground"
                >
                    <div className="mt-8">
                        <h2 className="text-3xl font-semibold mb-4">
                            Introduction
                        </h2>

                        <p
                            itemProp="description"
                            className="text-lg leading-8 text-(--muted)"
                        >
                            {blog.content.introduction}
                        </p>
                    </div>
                    <div>
                        {blog.content.sections.map((section) => (
                            <div
                                key={section.heading}
                                className="mt-12 first:mt-10"
                            >
                                <h2 className="text-2xl font-semibold mb-5">
                                    {section.heading}
                                </h2>

                                <div
                                    className="text-(--muted) leading-8 space-y-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul>strong]:text-foreground [&>ol>strong]:text-foreground [&>ol]:list-decimal [&>ol]:pl-6 [&>li]:mb-2 [&>p]:mb-4 [&>strong]:text-foreground! [&>p>strong]:text-foreground!"
                                    dangerouslySetInnerHTML={{
                                        __html: renderMarkdown(section.body)
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="mt-14 pt-8 border-t border-(--border)">
                        <h2 className="text-3xl font-semibold mb-4">
                            Conclusion
                        </h2>

                        <p className="leading-8 text-(--muted)">
                            {blog.content.conclusion}
                        </p>
                    </div>
                </article>
            </Card>
            <ButtonList
                heading="Related Blogs"
                list={filteredBlogsArray(blog.slug).map((b) => ({ title: b.title, href: `/blog/${b.slug}` }))}
            />
            <GoogleAd />
        </>
    )
}
