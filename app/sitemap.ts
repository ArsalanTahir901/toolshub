import { config } from "@/config";
import { paths } from "@/constants";
import { toolsBlogArticlesArray } from "@/features/blog/registry";
import { toolsArray } from "@/features/tools/registry";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = config.domainUrl;
    const stableLastModified = new Date(`${config.lastUpdated}-01-01T00:00:00.000Z`);

    const staticPages = [
        paths.home.href,
        paths.about.href,
        paths.contact.href,
        paths.blog.href,
        paths.privacy.href,
        paths.terms.href,
    ];

    return [
        ...staticPages.map((route) => ({
            url: `${baseUrl}${route}`,
            lastModified: stableLastModified,
            changeFrequency: "weekly" as const,
            priority: route === "/" ? 1 : 0.8,
        })),

        ...toolsArray.map((tool) => ({
            url: `${baseUrl}${tool.href}`,
            lastModified: stableLastModified,
            changeFrequency: "monthly" as const,
            priority: 0.9,
        })),

        ...toolsBlogArticlesArray.map((blog) => ({
            url: `${baseUrl}/blog/${blog.slug}`,
            lastModified: blog.updatedAt ? new Date(blog.updatedAt) : stableLastModified,
            changeFrequency: "monthly" as const,
            priority: 0.7,
        })),
    ];
}
