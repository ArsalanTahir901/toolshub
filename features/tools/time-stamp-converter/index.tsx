'use client'
import { ToolCard } from "@/components/tool-card"
import { useTimestampConverter } from "@/hooks/useTimeStampConverter"
import { LiveClock } from "./live-clock"
import { Divider } from "@/components/divider"
import { TimeStampToDate } from "./time-stamp-to-date"
import { DateToTimeStamp } from "./date-to-time-stamp"
import { ErrorMsg } from "@/components/error-msg"
import { Results } from "./results"
import { toolsConstant } from "@/features/tools/registry"
import { ToolsConstantKeyEnums } from "@/types/tools"

const TimestampConverter = () => {
    const {
        tsInput,
        dateInput,
        unit,
        result,
        error,
        liveNow,
        liveEnabled,
        onTsInputChange,
        onDateInputChange,
        onUnitChange,
        setLiveEnabled,
        convertTimestamp,
        convertDate,
        useNow,
        clear,
        copyValue,
        copyAll,
    } = useTimestampConverter()

    return (
        <ToolCard
            {...toolsConstant[ToolsConstantKeyEnums.TIME_STAMP_CONVERTER]}
            defaultOpen
        >
            {/* Live clock */}
            <LiveClock
                unix={liveNow.unix}
                iso={liveNow.iso8601}
                relative={liveNow.relative}
                timezone={liveNow.timezone}
                enabled={liveEnabled}
                onToggle={setLiveEnabled}
                onUseNow={useNow}
            />

            <Divider title="Convert" />

            {/* Timestamp → Date */}
            <TimeStampToDate
                convertTimestamp={convertTimestamp}
                onTsInputChange={onTsInputChange}
                onUnitChange={onUnitChange}
                tsInput={tsInput}
                unit={unit}
            />

            {/* Date → Timestamp */}
            <DateToTimeStamp
                convertDate={convertDate}
                dateInput={dateInput}
                onDateInputChange={onDateInputChange}
            />

            {/* Error */}
            <ErrorMsg error={error} />

            {/* Results */}
            <Results
                clear={clear}
                copyAll={copyAll}
                copyValue={copyValue}
                result={result}
            />

            {/* Placeholder */}
            {!result && !error && (
                <div className="result-box w-full text-center">
                    Converted time appears here
                </div>
            )}
        </ToolCard>
    )
}
export default TimestampConverter