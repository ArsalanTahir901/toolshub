'use client'
import { Button } from "@/components/buttons"
import { ToolCard } from "@/components/tool-card"
import { useUrlSlugGenerator } from "../../../hooks/useUrlSlugGenerator"
import { toolsConstant } from "@/features/tools/registry"
import { icons } from "@/components/icons"
import { ToolsConstantKeyEnums } from "@/types/tools"

const UrlSlugGenerator = () => {

    const {
        value,
        onChange,
        slug,
        onGenerate,
        onCopy
    } = useUrlSlugGenerator();

    return (
        <ToolCard
            {...toolsConstant[ToolsConstantKeyEnums.URL_SLUG]}
            defaultOpen
            input={{
                id: 'seo-slug-input',
                name: 'seo-slug',
                value,
                onChange,
                placeholder: 'My Amazing Blog Post Title 2025',
                type: 'text',
                "aria-label": 'Text input for SEO slug generater'
            }}
            footer={
                <>
                    <Button variant="glow" onClick={onGenerate} disabled={!value.trim()}>Generate Slug</Button>
                    <Button onClick={onCopy} disabled={!slug.trim()}>{icons.copy} Copy</Button>
                </>
            }
        >
            <div className="result-box">
                {slug || "your-slug-will-appear-here"}
            </div>
        </ToolCard>
    )
}

export default UrlSlugGenerator;