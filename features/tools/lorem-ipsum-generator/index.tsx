'use client'
import { Button } from "@/components/buttons"
import { ToolCard } from "@/components/tool-card"
import { useLoremIpsumGenerator } from "@/hooks/useLoremIpsumGenerator"
import { Label } from "@/components/label"
import { toolsConstant } from "@/features/tools/registry"
import { icons } from "@/components/icons"
import { ToolsConstantKeyEnums } from "@/types/tools"

const LoremIpsumGenerator = () => {
    const { count, onChange, onGenerate, onCopy, generatedContent, limit } = useLoremIpsumGenerator();

    return (
        <ToolCard
            {...toolsConstant[ToolsConstantKeyEnums.LOREM_IPSUM]}
            defaultOpen
            footer={
                <>
                    <Button variant="glow" onClick={onGenerate} disabled={!count.trim()}>{icons.checkList} Generate</Button>
                    <Button onClick={onCopy} disabled={!generatedContent.trim()}>{icons.copy} Copy</Button>
                    <div className="result-box w-full mb-0!">
                        {generatedContent || "Click Generate"}
                    </div>
                </>
            }
        >
            <div className="flex items-center gap-4">
                <Label htmlFor="count">Paragraphs:</Label>
                <input
                    id='count'
                    name="text-generater"
                    type="number"
                    value={count}
                    min="1"
                    max={limit}
                    className="max-w-20"
                    onChange={onChange}
                    aria-label="Text input for lorem ipsum generater"
                />
            </div>
        </ToolCard>
    )
}

export default LoremIpsumGenerator;