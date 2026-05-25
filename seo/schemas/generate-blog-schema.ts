import { config } from "@/config";
import { BlogArticleType } from "@/types";

export const generateBlogSchema = (
    blog: BlogArticleType
) => {
    const url = `${config.domainUrl}/blog/${blog.slug}`;

    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",

        headline: blog.title,
        description: blog.metaDescription,

        url,

        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
        },

        author: {
            "@type": "Organization",
            name: config.siteName,
        },

        publisher: {
            "@type": "Organization",
            name: config.siteName,
            logo: {
                "@type": "ImageObject",
                url: `${config.domainUrl}/android-chrome-512x512.png`,
                width: 512,
                height: 512,
            },
        },

        image: `${config.domainUrl}/og-img.png`,

        datePublished: blog.publishedAt,
        dateModified: blog.updatedAt ?? blog.publishedAt,

        keywords: blog.tags?.join(", "),
    };
};
