'use client'
import { Badge } from "@/components/badge"
import { Button } from "@/components/buttons"
import { GoogleAd } from "@/components/google-ad"
import { icons } from "@/components/icons"
import { Section } from "@/components/section"
import { SectionIntro } from "@/components/section-intro"
import { Tab } from "@/components/tab"
import { ToolCard } from "@/components/tool-card"
import { config } from "@/config"
import { toolsBlogArticles } from "@/features/blog/registry"
import { useBlog } from "./useBlog"
import Link from "next/link"

export const Blog = () => {
    const {
        active,
        filteredTools,
        search,
        setActive,
        setSearch,
        tabs
    } = useBlog();

    return (
        <>
            <Section aria-label="blogs" className="p-0!">
                <div className="text-center space-y-6">
                    <Badge title={`${icons.book} Knowledge Base`} variant="premium" className="text-sm!" />
                    <SectionIntro
                        title={config.siteName}
                        gradientText="Blog"
                        description="Tips, guides & tutorials for writers, developers, and digital marketers."
                    />
                    <div className="my-3 flex gap-2 justify-between flex-wrap sm:items-center">
                        <input
                            id="blog-search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            className=" max-w-64"
                            placeholder="Search articles..."
                        />
                        <Tab
                            data={tabs}
                            activeVal={active}
                            onClick={(val) => { setActive(val) }}
                            className="capitalize text-sm!"
                        />
                    </div>
                </div>

                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {filteredTools.length ? filteredTools.map((tool) => {
                        const blog = toolsBlogArticles[tool.slug]

                        return (
                            <Link key={tool.id} href={`/blog/${blog.slug}`}>
                                <article
                                    id={tool.id}
                                    className="bg-(--card) rounded-(--radius) overflow-hidden border border-transparent hover:border-(--bg-accent-glow) transition-all duration-200 hover:shadow-(--glow) hover:-translate-y-0.75"
                                >
                                    <div className="aspect-6/2 flex items-center justify-center p-3 text-4xl bg-(--muted)/5 border-b border-(--border) select-none">
                                        {tool.icon.text}
                                    </div>

                                    <div className="p-4">
                                        <div className="flex items-center flex-wrap gap-2">
                                            <Badge
                                                dot={false}
                                                title={tool.tag.text}
                                                variant={tool.tag.variant}
                                                className="capitalize!"
                                            />

                                            <div className="flex gap-2 flex-wrap items-center text-xs capitalize">
                                                {tool.seoCategory.map(
                                                    (cat) =>
                                                        !tool.tag.text.toLowerCase().includes(cat.toLowerCase()) && (
                                                            <span
                                                                key={cat}
                                                                className="border border-(--muted)/10 rounded-full px-2 py-0.5"
                                                            >
                                                                {cat}
                                                            </span>
                                                        )
                                                )}
                                            </div>
                                        </div>

                                        <div className="my-2">
                                            <h2 className="text-xl font-medium line-clamp-3">
                                                {blog.title}
                                            </h2>

                                            <p className="text-(--muted) line-clamp-3 my-2">
                                                {blog.metaDescription}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between gap-2 flex-wrap">
                                            <div className="text-xs text-(--muted)">
                                                Published at {blog.publishedAt}
                                            </div>

                                            <Button variant="link">
                                                {blog.readingTimeMinutes} min read
                                            </Button>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        )
                    }) :
                        <ToolCard
                            icon={{ text: icons.magnify, className: 'icon-red' }}
                            title="Blog not found"
                        />
                    }
                </div>
            </Section>
            <GoogleAd />
        </>
    )
}