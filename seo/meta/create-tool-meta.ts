import { Metadata } from "next";
import { config } from "@/config";
import { ToolsObject } from "@/types/tools";
import { absoluteUrl, seoConfig } from "@/seo/config";

export const createToolMetadata = (
    tool: ToolsObject
): Metadata => {
    const title =
        `${tool.title} - Free Online Tool`;

    const description =
        tool.description ||
        `Use ${tool.title} online for free on ${config.siteName}.`;

    const url = absoluteUrl(tool.href);

    return {
        metadataBase: new URL(seoConfig.siteUrl),

        title,
        description,

        keywords: [
            tool.title,
            `${tool.title} online`,
            `free ${tool.title}`,
            `${tool.title} tool`,
            "online tools",
            "developer tools",
            config.siteName,
        ],

        alternates: {
            canonical: url,
        },

        openGraph: {
            title,
            description,
            url,
            siteName: config.siteName,
            type: "website",

            images: [
                {
                    url: seoConfig.defaultImage,
                    width: 1200,
                    height: 630,
                    alt: tool.title,
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
