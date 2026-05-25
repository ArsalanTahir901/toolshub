import { copyToClipboard } from "@/utils";
import { buildResult, ConvertedTime, detectTimestampUnit, getRelative, parseDateInput, TimestampUnit } from "@/utils/time-stamp-converter";
import {
    ChangeEvent,
    useState,
    useEffect,
    useCallback,
    useMemo,
} from "react";
import toast from "react-hot-toast";


export const useTimestampConverter = () => {
    // Must be before useState initializers
    const timezone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone,
        []);

    const [tsInput, setTsInput] = useState("");
    const [dateInput, setDateInput] = useState("");
    const [unit, setUnit] = useState<TimestampUnit>("seconds");

    // Raw result source date
    const [resultDate, setResultDate] = useState<Date | null>(null);

    const [error, setError] = useState("");

    const [liveEnabled, setLiveEnabled] = useState(true);

    const [liveNow, setLiveNow] = useState<ConvertedTime>(() =>
        buildResult(new Date(), timezone)
    );

    // Stable Base Result
    const baseResult = useMemo(() => (resultDate ? buildResult(resultDate, timezone) : null),
        [resultDate, timezone]
    );

    // Live Relative Refresh Only
    const result = useMemo(() => {
        if (!baseResult || !resultDate) return null;

        return {
            ...baseResult,
            relative: getRelative(resultDate),
        };
    }, [baseResult, resultDate]);

    // Live Clock
    useEffect(() => {
        if (!liveEnabled) return;

        const id = setInterval(() => {
            setLiveNow(buildResult(new Date(), timezone));
        }, 1000);

        return () => clearInterval(id);
    }, [liveEnabled, timezone]);

    // Shared Reset
    const resetOutput = useCallback(() => {
        setError("");
        setResultDate(null);
    }, []);

    // Generic Input Handler Factory
    const createInputHandler = useCallback(
        (setter: React.Dispatch<React.SetStateAction<string>>) => {
            return (e: ChangeEvent<HTMLInputElement>) => {
                setter(e.target.value);
                resetOutput();
            };
        },
        [resetOutput]
    );

    const onTsInputChange = useMemo(() => createInputHandler(setTsInput),
        [createInputHandler]);

    const onDateInputChange = useMemo(() => createInputHandler(setDateInput),
        [createInputHandler]);

    // Better UX: changing unit should not wipe result
    const onUnitChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        setUnit(e.target.value as TimestampUnit);
    }, []);

    // Convert: Unix → Date
    const convertTimestamp = useCallback(() => {
        const raw = tsInput.trim();

        if (!raw) {
            toast.error("Enter a timestamp first");
            return;
        }

        const num = Number(raw);

        if (isNaN(num)) {
            setError("Invalid number");
            toast.error("Timestamp must be a valid number");
            return;
        }

        const inferredUnit = detectTimestampUnit(raw, unit);

        if (inferredUnit !== unit) {
            setUnit(inferredUnit);
            toast.success(`Auto-detected ${inferredUnit}`);
        }

        const ms =
            inferredUnit === "milliseconds"
                ? num
                : num * 1000;

        const date = new Date(ms);

        if (isNaN(date.getTime())) {
            setError("Invalid timestamp");
            toast.error("Invalid timestamp");
            return;
        }

        setError("");
        setResultDate(date);
    }, [tsInput, unit]);

    // Convert: Date → Unix
    const convertDate = useCallback(() => {
        const raw = dateInput.trim();

        if (!raw) {
            toast.error("Enter a date first");
            return;
        }

        const date = parseDateInput(raw);

        if (!date) {
            setError(
                "Invalid date — use YYYY-MM-DD, ISO 8601, or valid datetime"
            );
            toast.error("Invalid date format");
            return;
        }

        setError("");
        setResultDate(date);
    }, [dateInput]);

    // Use Current Time
    const useNow = useCallback(() => {
        const now = new Date();

        setTsInput(String(Math.floor(now.getTime() / 1000)));
        setDateInput(now.toISOString());

        setUnit("seconds");

        setResultDate(now);
        setError("");
    }, []);

    // Clear
    const clear = useCallback(() => {
        setTsInput("");
        setDateInput("");

        setResultDate(null);
        setError("");
    }, []);

    // Copy Helpers
    const copyValue = useCallback((val: string) => {
        copyToClipboard({ value: val });
    }, []);

    const copyAll = useCallback(() => {
        if (!result) return;

        const text = [
            `Unix (s):        ${result.unix}`,
            `Unix (ms):       ${result.unixMs}`,
            `ISO 8601:        ${result.iso8601}`,
            `UTC:             ${result.utc}`,
            `Local:           ${result.local}`,
            `UTC Date:        ${result.date}`,
            `Local Date:      ${result.localDate}`,
            `UTC Time:        ${result.time}`,
            `Local Time:      ${result.localTime}`,
            `UTC Day:         ${result.dayOfWeek}`,
            `Local Day:       ${result.localDayOfWeek}`,
            `Week Number:     ${result.weekNumber}`,
            `Relative:        ${result.relative}`,
            `Leap Year:       ${result.isLeapYear ? "Yes" : "No"}`,
            `Timezone:        ${result.timezone}`,
        ].join("\n");

        copyToClipboard({ value: text, successMsg: 'All values copied!' });

    }, [result]);

    return {
        // State
        tsInput,
        dateInput,
        unit,
        result,
        error,

        // Live
        liveNow,
        liveEnabled,

        // Handlers
        onTsInputChange,
        onDateInputChange,
        onUnitChange,

        // Controls
        setLiveEnabled,
        convertTimestamp,
        convertDate,
        useNow,
        clear,

        // Copy
        copyValue,
        copyAll,
    };
};