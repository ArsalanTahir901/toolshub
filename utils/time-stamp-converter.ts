// Types

export type TimestampUnit = "seconds" | "milliseconds";

export type ConvertedTime = {
    unix: number;
    unixMs: number;

    utc: string;
    local: string;

    iso8601: string;
    relative: string;

    date: string;           // UTC YYYY-MM-DD
    localDate: string;      // Local YYYY-MM-DD

    time: string;           // UTC HH:MM:SS
    localTime: string;      // Local HH:MM:SS

    dayOfWeek: string;      // UTC
    localDayOfWeek: string; // Local

    weekNumber: number;
    isLeapYear: boolean;
    timezone: string;
};

// Constants

const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
] as const;

// Helpers

const pad = (n: number, len = 2): string => String(n).padStart(len, "0");

const getWeekNumber = (d: Date): number => {
    const date = new Date(
        Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())
    );

    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));

    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));

    return Math.ceil(
        ((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
    );
};

const isLeapYear = (year: number): boolean => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

const formatDateUTC = (date: Date): string =>
    `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(
        date.getUTCDate()
    )}`;

const formatTimeUTC = (date: Date): string =>
    `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(
        date.getUTCSeconds()
    )}`;

const formatDateLocal = (date: Date): string =>
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
        date.getDate()
    )}`;

const formatTimeLocal = (date: Date): string =>
    `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
        date.getSeconds()
    )}`;

export const getRelative = (date: Date): string => {
    const now = new Date();

    const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);
    const abs = Math.abs(diffSec);
    const future = diffSec < 0;

    const fmt = (n: number, unit: string) =>
        future
            ? `in ${n} ${unit}${n !== 1 ? "s" : ""}`
            : `${n} ${unit}${n !== 1 ? "s" : ""} ago`;

    if (abs < 5) return "just now";
    if (abs < 60) return fmt(abs, "second");
    if (abs < 3600) return fmt(Math.floor(abs / 60), "minute");
    if (abs < 86400) return fmt(Math.floor(abs / 3600), "hour");
    if (abs < 604800) return fmt(Math.floor(abs / 86400), "day");
    if (abs < 2629800) return fmt(Math.floor(abs / 604800), "week");
    if (abs < 31557600) return fmt(Math.floor(abs / 2629800), "month");

    return fmt(Math.floor(abs / 31557600), "year");
};

export const parseDateInput = (raw: string): Date | null => {
    const trimmed = raw.trim();

    if (!trimmed) return null;

    // YYYY-MM-DD → local midnight
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
        return new Date(`${trimmed}T00:00:00`);
    }

    const parsed = new Date(trimmed);

    if (isNaN(parsed.getTime())) return null;

    return parsed;
};

export const detectTimestampUnit = (
    raw: string,
    selectedUnit: TimestampUnit
): TimestampUnit => {
    const digitsOnly = raw.replace(/^-/, "");

    if (digitsOnly.length >= 13) return "milliseconds";
    if (digitsOnly.length <= 10) return "seconds";

    return selectedUnit;
};

export const buildResult = (date: Date, timezone: string): ConvertedTime => {
    const unix = Math.floor(date.getTime() / 1000);

    return {
        unix,
        unixMs: date.getTime(),

        utc: date.toUTCString(),
        local: date.toLocaleString(),

        iso8601: date.toISOString(),
        relative: getRelative(date),

        date: formatDateUTC(date),
        localDate: formatDateLocal(date),

        time: formatTimeUTC(date),
        localTime: formatTimeLocal(date),

        dayOfWeek: DAYS[date.getUTCDay()],
        localDayOfWeek: DAYS[date.getDay()],

        weekNumber: getWeekNumber(date),
        isLeapYear: isLeapYear(date.getUTCFullYear()),
        timezone,
    };
};