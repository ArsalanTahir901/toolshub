import { Metadata } from "next";
import { config } from "@/config";
import { BlogArticleType } from "@/types";
import { absoluteUrl, seoConfig } from "@/seo/config";

export const createBlogMetadata = (
    blog: BlogArticleType
): Metadata => {
    const title = blog.seoTitle ?? blog.title;

    const description =
        blog.metaDescription ||
        `Learn more about ${blog.title} with this practical guide from ${config.siteName}.`;

    const url = absoluteUrl(`/blog/${blog.slug}`);

    return {
        metadataBase: new URL(seoConfig.siteUrl),

        title,
        description,

        keywords: [
            ...(blog.tags ?? []),
            blog.title,
            config.siteName,
            "online tools",
            "free tools",
            "developer tools",
            "productivity tools",
        ],

        authors: [
            {
                name: config.siteName,
            },
        ],

        creator: config.siteName,
        publisher: config.siteName,

        alternates: {
            canonical: url,
        },

        openGraph: {
            title,
            description,
            url,
            siteName: config.siteName,
            type: "article",

            publishedTime: blog.publishedAt,
            modifiedTime: blog.updatedAt ?? blog.publishedAt,

            authors: [config.siteName],

            tags: blog.tags,

            images: [
                {
                    url: seoConfig.defaultImage,
                    width: 1200,
                    height: 630,
                    alt: blog.title,
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title,
            description,
            creator: seoConfig.twitterHandle,
            images: [seoConfig.defaultImage],
        },

        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-image-preview": "large",
                "max-snippet": -1,
                "max-video-preview": -1,
            },
        },

        category: seoConfig.category,
    };
};
