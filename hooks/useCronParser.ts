import { copyToClipboard } from "@/utils";
import { parseCron } from "@/utils/cron-parser";
import { ChangeEvent, useMemo, useState } from "react";

export const useCronParser = () => {

    const [expr, setExpr] = useState("0 9 * * 1-5");

    const result = useMemo(() => parseCron(expr), [expr]);

    const onExprChange = (e: ChangeEvent<HTMLInputElement>) => setExpr(e.target.value);
    const loadPreset = (value: string) => setExpr(value);
    const copyExpr = () => copyToClipboard({ value: expr });
    const copyNextRuns = () => {
        if (!result.nextRuns.length) return;
        copyToClipboard({ value: result.nextRuns.map((d) => d.toLocaleString()).join("\n") });
    };

    return {
        expr,
        result,
        onExprChange,
        loadPreset,
        copyExpr,
        copyNextRuns,
    };
};