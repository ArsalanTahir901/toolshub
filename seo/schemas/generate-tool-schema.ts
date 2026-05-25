import { config } from "@/config";
import { ToolsObject } from "@/types/tools";
import { getPrimarySchemaCategory } from "./get-primary-schema-category";

export const generateToolSchema = (tool: ToolsObject) => {
    return {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: tool.title,
        description: tool.description,
        url: `${config.domainUrl}${tool.href}`,
        applicationCategory: getPrimarySchemaCategory(tool.seoCategory),
        operatingSystem: "All",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
    };
};