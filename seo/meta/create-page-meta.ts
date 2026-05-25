import type { Metadata } from "next";
import { absoluteUrl, seoConfig } from "@/seo/config";

type PageMetadataInput = {
    title: string;
    description: string;
    path: string;
    keywords?: string[];
    image?: string;
    type?: "website" | "article";
    noIndex?: boolean;
};

export const createPageMetadata = ({
    title,
    description,
    path,
    keywords = [],
    image = seoConfig.defaultImage,
    type = "website",
    noIndex = false,
}: PageMetadataInput): Metadata => {
    const url = absoluteUrl(path);

    return {
        metadataBase: new URL(seoConfig.siteUrl),
        title,
        description,
        keywords: [
            ...keywords,
            seoConfig.siteName,
            "free online tools",
            "developer tools",
            "productivity tools",
        ],
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            siteName: seoConfig.siteName,
            type,
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            creator: seoConfig.twitterHandle,
            images: [image],
        },
        robots: {
            index: !noIndex,
            follow: !noIndex,
            googleBot: {
                index: !noIndex,
                follow: !noIndex,
                "max-image-preview": "large",
                "max-snippet": -1,
                "max-video-preview": -1,
            },
        },
        category: seoConfig.category,
    };
};
