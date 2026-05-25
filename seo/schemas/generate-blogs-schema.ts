import { config } from "@/config";
import { BlogArticleType } from "@/types";

export const generateBlogsSchema = (
    blogs: BlogArticleType[]
) => ({
    "@context": "https://schema.org",
    "@type": "ItemList",

    name: `${config.siteName} Blog`,
    description:
        "Guides, tutorials, and educational articles about online tools, productivity, writing, and development.",

    itemListOrder: "https://schema.org/ItemListOrderAscending",

    numberOfItems: blogs.length,

    itemListElement: blogs.map((blog, index) => ({
        "@type": "ListItem",

        position: index + 1,

        url: `${config.domainUrl}/blog/${blog.slug}`,

        item: {
            "@type": "BlogPosting",

            headline: blog.title,

            description: blog.metaDescription,

            datePublished: blog.publishedAt,

            dateModified:
                blog.updatedAt ?? blog.publishedAt,
        },
    })),
});