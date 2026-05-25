'use client'
import { Button } from "@/components/buttons"
import { ToolCard } from "@/components/tool-card"
import { useBaseConverter } from "../../../hooks/useBaseConverter"
import { Spinner } from "@/components/skeletons/spinner"
import { ResultSkeleton } from "@/components/skeletons/result"
import { FileUpload } from "./file-upload"
import { toolsConstant } from "@/features/tools/registry"
import { icons } from "@/components/icons"
import { ToolsConstantKeyEnums } from "@/types/tools"

const BaseConverter = () => {
    const {
        options,
        option,
        value,
        onChange,
        b64Decode,
        b64Encode,
        onOptionChange,
        result,
        onCopy,
        fileInputRef,
        fileName,
        imgSrc,
        onFileChange,
        openFilePicker,
        downloadBase64AsFile,
        decodeAndDownload,
        isFileBased,
        isImageMode,
        isAudioMode,
        isVideoMode,
        mediaSrc,
        fullBase64,
        isEncoding,
        isProcessing,
        isLarge,
    } = useBaseConverter();

    const getFileContent = () => {
        if (isImageMode) return { label: 'image', icon: icons.image, imgType: 'image/*', downloadText: 'Image' };
        if (isAudioMode) return { label: 'audio file', icon: icons.music, imgType: 'audio/*', downloadText: 'Audio' };
        if (isVideoMode) return { label: 'video file', icon: icons.video, imgType: 'video/*', downloadText: 'Video' };
        return { label: 'file', icon: icons.folder, imgType: undefined, downloadText: 'File' }
    }

    const getPlaceholder = () => {
        if (option === 'hex') return 'Enter hex string (e.g. 48 65 6c 6c 6f) or Base64 to decode…';
        if (option === 'url-safe') return 'Enter text to encode or URL-safe Base64 to decode…';
        if (option === 'jwt') return "Paste your JWT token here…";
        if (option === 'json') return 'Enter valid JSON to encode, or Base64 JSON to decode…';
        return 'Enter text or Base64 string…'
    }

    const getFileBtnText = () => {
        if (isEncoding) return <span>Encoding…</span>;
        if (fileName) return <span className="text-(--muted) truncate text-ellipsis">{fileName}</span>;
        return <span>Click to select {getFileContent().label}</span>;
    }

    return (
        <ToolCard
            {...toolsConstant[ToolsConstantKeyEnums.BASE_64]}
            defaultOpen
            textarea={isFileBased ? undefined : {
                id: 'base64-encoder-decoder',
                name: 'base64-encode-decode',
                value,
                onChange,
                placeholder: getPlaceholder(),
                'aria-label': "Base64 input"
            }}
            footer={
                <>
                    {isFileBased &&
                        <FileUpload
                            decodeAndDownload={decodeAndDownload}
                            downloadBase64AsFile={downloadBase64AsFile}
                            fileBtnText={getFileBtnText()}
                            fileContent={getFileContent()}
                            fullBase64={fullBase64}
                            imgSrc={imgSrc}
                            isAudioMode={isAudioMode}
                            isEncoding={isEncoding}
                            isImageMode={isImageMode}
                            isVideoMode={isVideoMode}
                            mediaSrc={mediaSrc}
                            onChange={onChange}
                            value={value}
                            openFilePicker={openFilePicker}
                            uploadInput={{
                                ref: fileInputRef,
                                type: "file",
                                accept: getFileContent().imgType,
                                className: "hidden",
                                onChange: onFileChange,
                                'aria-label': `Select ${getFileContent().label}`
                            }}
                        />
                    }

                    {/* ── Text mode actions ── */}
                    {!isFileBased && (
                        <>
                            {option !== "jwt" && (
                                <Button variant="glow" onClick={b64Encode} disabled={isProcessing}>
                                    {isProcessing ? <Spinner /> : "Encode"}
                                </Button>
                            )}
                            <Button variant="glow" onClick={b64Decode} disabled={isProcessing}>
                                {isProcessing ? <Spinner /> : "Decode"}
                            </Button>
                        </>
                    )}

                    <Button
                        onClick={onCopy}
                        disabled={!result.trim() && !fullBase64}
                    >
                        {icons.copy} Copy {isLarge ? "(Full)" : ""}
                    </Button>

                    {/* Result box */}
                    <div className="result-box w-full break-all">
                        {(isProcessing || isEncoding)
                            ? <ResultSkeleton />
                            : result || "Result appears here"
                        }
                    </div>
                </>
            }
        >
            <label htmlFor="base64-option-select">Select option:</label>
            <select
                id="base64-option-select"
                name="base64-options"
                value={option}
                onChange={onOptionChange}
                aria-label="base64 option"
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
        </ToolCard>
    )
}

export default BaseConverter;