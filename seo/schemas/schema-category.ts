import { ToolCategoryEnum } from "@/features/tools/registry";

export const schemaCategoryMap: Record<ToolCategoryEnum, string> = {
    [ToolCategoryEnum.SEO]: "DeveloperApplication",
    [ToolCategoryEnum.GENERATOR]: "UtilitiesApplication",
    [ToolCategoryEnum.CALCULATOR]: "CalculatorApplication",
    [ToolCategoryEnum.CONVERTER]: "UtilitiesApplication",
    [ToolCategoryEnum.DEVELOPER]: "DeveloperApplication",
    [ToolCategoryEnum.SECURITY]: "SecurityApplication",
    [ToolCategoryEnum.IMAGE]: "MultimediaApplication",
    [ToolCategoryEnum.TEXT]: 'UtilitiesApplication',
    [ToolCategoryEnum.UTILITY]: 'UtilitiesApplication',
    [ToolCategoryEnum.ANALYZER]: 'UtilitiesApplication'
};

export const getSchemaCategory = (categories: ToolCategoryEnum[]) => {
    return (
        categories
            .map(category => schemaCategoryMap[category])
            .find(Boolean)
        || "UtilitiesApplication"
    );
};