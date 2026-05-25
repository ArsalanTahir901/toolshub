'use client'
import { Button } from '@/components/buttons';
import { icons } from '@/components/icons';
import { Label } from '@/components/label';
import { ToolCard } from '@/components/tool-card';
import { toolsConstant } from '@/features/tools/registry';
import { usePasswordGenerator } from '@/hooks/usePasswordGenerator';
import { ToolsConstantKeyEnums } from "@/types/tools"

const PasswordGenerator = () => {

    const {
        progress,
        onProgressChange,
        options,
        checkedOptions,
        onCheckboxChange,
        generatePassword,
        password,
        onCopy
    } = usePasswordGenerator();

    return (
        <ToolCard
            defaultOpen
            {...toolsConstant[ToolsConstantKeyEnums.PASSWORD_GENERATOR]}
            footer={
                <>
                    <Button variant="glow" onClick={generatePassword}>{icons.zap} Generate</Button>
                    <Button variant="ghost" onClick={onCopy} disabled={!password}>{icons.copy} Copy</Button>
                </>
            }
        >
            <Label htmlFor="progress">Length: <span>{progress}</span></Label>
            <input
                type="range"
                id='progress'
                name="password-range-progress"
                aria-label="Text input for password generator"
                min="8"
                max="64"
                value={progress}
                onChange={onProgressChange}
            />
            <div className="checkbox-row">
                {options.map((option) => (
                    <Label key={option} htmlFor={option} className='capitalize flex items-center select-none'>
                        <input
                            id={option}
                            type="checkbox"
                            name={option}
                            aria-label={option}
                            checked={checkedOptions.includes(option)}
                            onChange={onCheckboxChange}
                            className="mr-1"
                        />
                        {option}
                    </Label>

                ))}
            </div>
            <div className="result-box">
                {password || 'Click Generate to create a password'}
            </div>
        </ToolCard>
    )
}

export default PasswordGenerator
