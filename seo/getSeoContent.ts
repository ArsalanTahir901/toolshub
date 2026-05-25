import { ToolsConstantKeyEnums } from '@/types/tools';
import { cache } from 'react'

export const getSeoContent = cache(async (slug: ToolsConstantKeyEnums) => {
    const { toolsSeoContent } = await import('./seo-content');
    return toolsSeoContent[slug] ?? null
})