import { config } from "@/config";
import { ToolsObject } from "@/types/tools";
import { getPrimarySchemaCategory } from "./get-primary-schema-category";

export const generateToolsSchema = (tools: ToolsObject[]) => {
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Free Online Tools",
        itemListElement: tools.map((tool, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@type": "WebApplication",
                name: tool.title,
                description: tool.description,
                url: `${config.domainUrl}${tool.href}`,
                applicationCategory: getPrimarySchemaCategory(tool.seoCategory),
                operatingSystem: "All",
            },
        })),
    };
};