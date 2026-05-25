import { Button } from "@/components/buttons"
import { icons } from "@/components/icons";
import { InputHTMLAttributes, RefAttributes } from "react"

interface Props {
    fileInputRef: RefAttributes<HTMLInputElement>['ref'];
    onChange: InputHTMLAttributes<HTMLInputElement>['onChange'];
    onSelectFile: () => void
    fileName: string
}

export const FileUpload = ({ fileName, onChange, onSelectFile, fileInputRef }: Props) => {
    return (
        <div className="w-full flex flex-col gap-2 mb-3">
            <input
                ref={fileInputRef}
                type="file"
                onChange={onChange}
                className="hidden"
                id="file-upload"
            />

            <Button
                onClick={onSelectFile}
                className="w-full"
            >
                {icons.folder} Select File
            </Button>

            {fileName && (
                <div className="text-xs text-(--muted) truncate">
                    Selected: {fileName}
                </div>
            )}
        </div>
    )
}