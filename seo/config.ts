import { config } from "@/config";

export const seoConfig = {
    siteName: config.siteName,
    siteUrl: config.domainUrl,
    defaultTitle: `${config.siteName} - Free Online Developer and Productivity Tools`,
    defaultDescription:
        "Use free online tools for writing, development, SEO, security, encoding, formatting, colors, timestamps, QR codes, and everyday productivity.",
    defaultImage: "/og-img.png",
    logo: "/android-chrome-512x512.png",
    twitterHandle: "@toolshub",
    category: "Technology",
};

export const absoluteUrl = (path = "/") => {
    if (path.startsWith("http")) return path;

    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${seoConfig.siteUrl}${normalizedPath}`;
};
