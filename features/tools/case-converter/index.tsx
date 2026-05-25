'use client'
import { Button } from '@/components/buttons'
import { icons } from '@/components/icons'
import { Label } from '@/components/label'
import { ToolCard } from '@/components/tool-card'
import { toolsConstant } from '@/features/tools/registry'
import { useCaseConverter } from '@/hooks/useCaseConverter'
import { ToolsConstantKeyEnums } from "@/types/tools"

const CaseConverter = () => {

    const {
        options,
        caseConverter,
        onCaseChange,
        onCopy,
        content,
        onContentChange,
        convertedContent
    } = useCaseConverter();

    return (
        <ToolCard
            defaultOpen
            {...toolsConstant[ToolsConstantKeyEnums.CASE_CONVERTER]}
            textarea={{
                id: 'case-converter',
                name: 'case-convert',
                value: content,
                onChange: onContentChange,
                placeholder: 'Enter text to convert...',
                "aria-label": 'Text input for case converter'
            }}
            footer={
                <>
                    <Button variant="ghost" onClick={onCopy} disabled={!convertedContent.trim()}>{icons.copy} Copy</Button>
                    <div className="result-box w-full mt-0!">{convertedContent || "Result appears here"}</div>
                </>
            }
        >
            <Label htmlFor="case-converter-options">Select option:</Label>
            <select id='case-converter-options' name="case-converter" value={caseConverter} onChange={onCaseChange}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </ToolCard>
    )
}

export default CaseConverter
