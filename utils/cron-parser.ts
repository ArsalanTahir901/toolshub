import { CronExpressionParser } from "cron-parser";

// Constants
const DOW_NAMES = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const FIELD_META = [
    { label: "Minute", min: 0, max: 59 },
    { label: "Hour", min: 0, max: 23 },
    { label: "Day (Month)", min: 1, max: 31 },
    { label: "Month", min: 1, max: 12 },
    { label: "Day (Week)", min: 0, max: 7 },
] as const;

export const PRESETS: { label: string; expr: string; desc: string }[] = [
    { label: "Every minute", expr: "* * * * *", desc: "Runs every minute" },
    { label: "Every 5 minutes", expr: "*/5 * * * *", desc: "Runs every 5 minutes" },
    { label: "Every hour", expr: "0 * * * *", desc: "At the start of every hour" },
    { label: "Daily at midnight", expr: "0 0 * * *", desc: "Every day at 00:00" },
    { label: "Daily at noon", expr: "0 12 * * *", desc: "Every day at 12:00" },
    { label: "Weekdays at 9 AM", expr: "0 9 * * 1-5", desc: "Monday–Friday at 09:00" },
    { label: "Weekly on Sunday", expr: "0 0 * * 0", desc: "Every Sunday at 00:00" },
    { label: "Monthly (1st)", expr: "0 0 1 * *", desc: "1st of every month at 00:00" },
    { label: "Yearly (Jan 1st)", expr: "0 0 1 1 *", desc: "January 1st at 00:00" },
];

// Types

export interface CronField {
    label: string;
    min: number;
    max: number;
    value: string;
    valid: boolean;
    desc: string;
}

export interface ParseResult {
    valid: boolean;
    fields: CronField[];
    description: string;
    nextRuns: Date[];
    error: string;
}

// Validator  (keep custom — gives friendly per-field errors)

function validateField(
    value: string,
    min: number,
    max: number
): { valid: boolean; desc: string } {

    // Wildcard
    if (value === "*") {
        return { valid: true, desc: "every value" };
    }

    // */step
    if (/^\*\/\d+$/.test(value)) {
        const step = Number(value.slice(2));

        if (step <= 0) {
            return {
                valid: false,
                desc: `Invalid step: "${value}"`,
            };
        }

        return {
            valid: true,
            desc: `every ${step}`,
        };
    }

    // Comma-separated list
    if (value.includes(",")) {
        const parts = value.split(",");

        for (const part of parts) {
            if (!/^\d+$/.test(part)) {
                return {
                    valid: false,
                    desc: `Invalid value: "${part}"`,
                };
            }

            const n = Number(part);

            if (n < min || n > max) {
                return {
                    valid: false,
                    desc: `Out of range: "${part}" (${min}–${max})`,
                };
            }
        }

        return {
            valid: true,
            desc: value,
        };
    }

    // Range or range/step
    if (value.includes("-")) {
        const match = value.match(/^(\d+)-(\d+)(?:\/(\d+))?$/);

        if (!match) {
            return {
                valid: false,
                desc: `Invalid range: "${value}"`,
            };
        }

        const a = Number(match[1]);
        const b = Number(match[2]);
        const step = match[3] ? Number(match[3]) : undefined;

        if (a < min || b > max || a > b) {
            return {
                valid: false,
                desc: `Invalid range: "${value}" (${min}–${max})`,
            };
        }

        if (step !== undefined && step <= 0) {
            return {
                valid: false,
                desc: `Invalid step in range: "${value}"`,
            };
        }

        return {
            valid: true,
            desc: `${a}–${b}${step ? ` every ${step}` : ""}`,
        };
    }

    // Single number
    if (!/^\d+$/.test(value)) {
        return {
            valid: false,
            desc: `Invalid value: "${value}"`,
        };
    }

    const n = Number(value);

    if (n < min || n > max) {
        return {
            valid: false,
            desc: `Out of range: "${value}" (${min}–${max})`,
        };
    }

    return {
        valid: true,
        desc: String(n),
    };
}

// Human-readable description  (keep custom — more context-aware)

function buildDescription(parts: string[]): string {
    const [minF, hrF, domF, monF, dowF] = parts;

    if (parts.every((p) => p === "*")) {
        return "Runs every minute";
    }

    if (
        minF.startsWith("*/") &&
        hrF === "*" &&
        domF === "*" &&
        monF === "*" &&
        dowF === "*"
    ) {
        return `Runs every ${minF.slice(2)} minutes`;
    }

    const timePart = (() => {
        if (/^\d+$/.test(hrF) && /^\d+$/.test(minF)) {
            return `at ${hrF.padStart(2, "0")}:${minF.padStart(2, "0")}`;
        }
        if (/^\d+$/.test(hrF) && /^\*\/\d+$/.test(minF)) {
            return `every ${minF.slice(2)} minutes during hour ${hrF}`;
        }
        if (hrF.includes("-")) {
            const [from, to] = hrF.split("-");
            return `hourly between ${from}:00 and ${to}:59`;
        }
        return `with schedule "${minF} ${hrF}"`;
    })();

    const dowPart = (() => {
        if (dowF === "*") return "";
        if (/^\d+$/.test(dowF)) {
            return `on ${DOW_NAMES[Number(dowF) % 7]}`;
        }
        if (dowF.includes("-")) {
            const [a, b] = dowF.split("-").map(Number);
            return `on ${DOW_NAMES[a]}–${DOW_NAMES[b % 7]}`;
        }
        if (dowF.includes(",")) {
            return `on ${dowF.split(",").map((d) => DOW_NAMES[Number(d) % 7]).join(", ")}`;
        }
        return "";
    })();

    const domPart = (() => {
        if (domF === "*") return "";
        if (/^\d+$/.test(domF)) return `on day ${domF}`;
        if (/^\*\/\d+$/.test(domF)) return `every ${domF.slice(2)} days`;
        return `on day pattern "${domF}"`;
    })();

    const monthPart = (() => {
        if (monF === "*") return "";
        if (/^\d+$/.test(monF)) return `in ${MONTH_NAMES[Number(monF) - 1]}`;
        if (monF.includes("-")) {
            const [a, b] = monF.split("-").map(Number);
            return `during ${MONTH_NAMES[a - 1]}–${MONTH_NAMES[b - 1]}`;
        }
        return `in month pattern "${monF}"`;
    })();

    return ["Runs", timePart, dowPart, domPart, monthPart]
        .filter(Boolean)
        .join(" ");
}

// getNextRuns  — powered by cron-parser
// Handles leap years, varying month lengths, Sunday-as-7, timezones, etc.

function getNextRuns(expr: string, count = 8): Date[] {
    try {
        const interval = CronExpressionParser.parse(expr);
        return Array.from({ length: count }, () => interval.next().toDate());
    } catch {
        return [];
    }
}

// Main entry point

export function parseCron(expr: string): ParseResult {
    const trimmed = expr.trim();

    if (!trimmed) {
        return {
            valid: false,
            fields: [],
            description: "",
            nextRuns: [],
            error: "Empty expression",
        };
    }

    const parts = trimmed.split(/\s+/);

    if (parts.length !== 5) {
        return {
            valid: false,
            fields: [],
            description: "",
            nextRuns: [],
            error: `Expected 5 fields, got ${parts.length}`,
        };
    }

    // Per-field validation (friendly UI errors)
    const fields: CronField[] = parts.map((value, i) => {
        const meta = FIELD_META[i];
        const { valid, desc } = validateField(
            value,
            meta.min,
            meta.max
        );

        return {
            ...meta,
            value,
            valid,
            desc,
        };
    });

    // Field-level validation errors
    const invalidField = fields.find((field) => !field.valid);

    if (invalidField) {
        return {
            valid: false,
            fields,
            description: "",
            nextRuns: [],
            error: `${invalidField.label}: ${invalidField.desc}`,
        };
    }

    // Final cron syntax validation
    try {
        CronExpressionParser.parse(trimmed);
    } catch (err) {
        return {
            valid: false,
            fields,
            description: "",
            nextRuns: [],
            error:
                err instanceof Error
                    ? err.message
                    : "Invalid cron expression",
        };
    }

    return {
        valid: true,
        fields,
        description: buildDescription(parts),
        nextRuns: getNextRuns(trimmed),
        error: "",
    };
}