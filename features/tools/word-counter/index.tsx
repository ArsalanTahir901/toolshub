'use client'
import { Button } from '@/components/buttons';
import { icons } from '@/components/icons';
import { ToolCard } from '@/components/tool-card';
import { toolsConstant } from '@/features/tools/registry';
import { useWordCounter } from '@/hooks/useWordCounter';
import { ToolsConstantKeyEnums } from "@/types/tools"

const WordCounter = () => {
    const { countWords, stats, value, onClear, onCopy } = useWordCounter();

    return (
        <ToolCard
            defaultOpen
            {...toolsConstant[ToolsConstantKeyEnums.WORD_COUNTER]}
            stats={stats}
            textarea={{
                id: 'word-count-input',
                name: 'word-count',
                value,
                autoFocus: true,
                onChange: ({ target }) => countWords(target.value),
                placeholder: "Type or paste your text here...",
                'aria-label': "Text input for word counter"
            }}
            footer={
                <>
                    <Button variant='ghost' onClick={onClear} disabled={!value.trim()}>Clear</Button>
                    <Button variant='glow' onClick={onCopy} disabled={!value.trim()}>{icons.copy} Copy Text</Button>
                </>
            }
        />
    )
}

export default WordCounter
