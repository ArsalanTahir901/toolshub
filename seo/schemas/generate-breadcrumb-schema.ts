import { config } from "@/config";
import { BreadCrumbsProps } from "@/types";

export const generateBreadcrumbSchema = (items: BreadCrumbsProps["items"] = []) => {
    const baseUrl = config.domainUrl;

    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",

        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",

            position: index + 1,

            name: item.label,

            ...(item.href && {
                item: `${baseUrl}${item.href}`,
            }),
        })),
    };
};