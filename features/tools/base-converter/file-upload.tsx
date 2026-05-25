import { Button } from "@/components/buttons"
import { icons } from "@/components/icons";
import Image from "next/image"
import { InputHTMLAttributes, ReactNode, RefAttributes, TextareaHTMLAttributes } from "react"

type UploadInputProps = InputHTMLAttributes<HTMLInputElement> &
    RefAttributes<HTMLInputElement>;

interface Props {
    uploadInput: UploadInputProps
    openFilePicker: () => void;
    isEncoding: boolean;
    fileContent: {
        icon: string;
        downloadText: string;
        label: string
    }
    fileBtnText: ReactNode
    isImageMode: boolean;
    imgSrc: string
    mediaSrc: string;
    isAudioMode: boolean;
    isVideoMode: boolean
    fullBase64: string
    downloadBase64AsFile: () => void
    decodeAndDownload: () => void
    value: string
    onChange: TextareaHTMLAttributes<HTMLTextAreaElement>['onChange']
}

export const FileUpload = ({
    uploadInput,
    isEncoding,
    openFilePicker,
    fileBtnText,
    fileContent,
    imgSrc,
    isImageMode,
    isAudioMode,
    isVideoMode,
    mediaSrc,
    fullBase64,
    downloadBase64AsFile,
    decodeAndDownload,
    onChange,
    value
}: Props) => {
    return (
        <div className="w-full flex flex-col gap-3">
            {/* Hidden real file input */}
            <input {...uploadInput} />

            {/* Encode section: pick file → Base64 */}
            <p className="text-xs text-(--muted) font-medium uppercase mb-0!">
                Encode → Base64
            </p>

            <Button
                onClick={openFilePicker}
                disabled={isEncoding}
                className="flex items-center truncate text-ellipsis overflow-hidden justify-center gap-2 w-full py-7 px-4 border border-(--border) border-dashed rounded-xl"
            >
                <span className="text-lg">{fileContent.icon}</span>
                {fileBtnText}
            </Button>

            {/* Previews */}
            {isImageMode && imgSrc && (
                <div className="relative w-full h-44 rounded-(--radius) overflow-hidden bg-background">
                    <Image src={imgSrc} alt="Preview" fill className="object-contain" />
                </div>
            )}

            {mediaSrc &&
                <>
                    {isAudioMode && (
                        <audio controls className="w-full">
                            <source src={mediaSrc} />
                            Your browser does not support audio playback.
                        </audio>
                    )}

                    {isVideoMode && (
                        <video controls className="w-full rounded-(--radius) max-h-72 bg-black">
                            <source src={mediaSrc} />
                            Your browser does not support video playback.
                        </video>
                    )}
                </>
            }

            {/* Download encoded result */}
            <Button
                variant="glow"
                onClick={() => downloadBase64AsFile()}
                disabled={!fullBase64 || isEncoding}
            >
                {icons.download} Download Encoded {fileContent.downloadText}
            </Button>

            {/* ── Decode section: paste Base64 → download ── */}
            <div className="w-full h-px bg-(--border)" />

            <p className="text-xs text-(--muted) font-medium uppercase mb-0!">
                Decode Base64 → {fileContent.label}
            </p>

            <textarea
                id="decoder-input"
                name="decode-base64-input"
                placeholder={`Paste Base64 string to decode back to ${fileContent.label}…`}
                value={value}
                onChange={onChange}
                aria-label="Base64 decode input"
            />

            <Button variant="glow" onClick={decodeAndDownload} disabled={!value.trim()}>
                {icons.download} Decode &amp; Download {fileContent.downloadText}
            </Button>
        </div>
    )
}