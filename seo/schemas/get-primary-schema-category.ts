import { ToolCategoryEnum } from "@/types/tools";

export const getPrimarySchemaCategory = (
    categories: ToolCategoryEnum[]
) => {
    if (
        categories.includes(ToolCategoryEnum.SECURITY)
    ) {
        return "SecurityApplication";
    }

    if (
        categories.includes(ToolCategoryEnum.CALCULATOR)
    ) {
        return "CalculatorApplication";
    }

    if (
        categories.includes(ToolCategoryEnum.DEVELOPER) ||
        categories.includes(ToolCategoryEnum.SEO)
    ) {
        return "DeveloperApplication";
    }

    return "UtilitiesApplication";
};