import { copyToClipboard } from "@/utils";
import { ColorFormat, ColorResult, convertColor, DEFAULT_HEX, DEFAULT_RESULT, formatForInput, fromRgb, hexToRgb } from "@/utils/color-converter";
import { ChangeEvent, useCallback, useState } from "react";

export const useColorConverter = () => {
    const [inputFormat, setInputFormat] = useState<ColorFormat>("hex");

    const [rawInput, setRawInput] = useState(DEFAULT_HEX);

    const [result, setResult] = useState<ColorResult | null>(DEFAULT_RESULT);

    const [error, setError] = useState("");

    // Apply Conversion
    const applyConversion = useCallback((raw: string, format: ColorFormat) => {
        const { result, error } = convertColor(raw, format);

        setResult(result);
        setError(error);
    },
        []
    );

    // Shared HEX handler

    const applyHex = useCallback((hex: string) => {
        const rgb = hexToRgb(hex);

        if (!rgb) return;

        const converted = fromRgb(rgb);

        setResult(converted);
        setRawInput(formatForInput(converted, inputFormat));
        setError("");
    },
        [inputFormat]
    );

    // Handlers

    const onRawChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        setRawInput(value);
        applyConversion(value, inputFormat);
    },
        [applyConversion, inputFormat]
    );

    const onFormatChange = useCallback((format: ColorFormat) => {
        setInputFormat(format);

        if (!result) {
            setRawInput("");
            return;
        }

        const formatted = formatForInput(result, format);

        setRawInput(formatted);
        applyConversion(formatted, format);
    },
        [result, applyConversion]
    );

    const onPickerChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        applyHex(e.target.value);
    },
        [applyHex]
    );

    const onSwatchClick = useCallback((hex: string) => {
        applyHex(hex);
    },
        [applyHex]
    );

    // Copy

    const copyValue = useCallback((value: string) => {
        copyToClipboard({ value });
    }, []);

    const copyAll = useCallback(() => {
        if (!result) return;

        const text = [
            `HEX:  ${result.hex}`,
            `RGB:  rgb(${result.rgb.r}, ${result.rgb.g}, ${result.rgb.b})`,
            `HSL:  hsl(${result.hsl.h}, ${result.hsl.s}%, ${result.hsl.l}%)`,
            `HSV:  hsv(${result.hsv.h}, ${result.hsv.s}%, ${result.hsv.v}%)`,
            `CMYK: cmyk(${result.cmyk.c}%, ${result.cmyk.m}%, ${result.cmyk.y}%, ${result.cmyk.k}%)`,
        ].join("\n");

        copyToClipboard({ value: text, successMsg: 'All values copied!' });

    }, [result]);

    // Reset

    const clear = useCallback(() => {
        setInputFormat("hex");
        setRawInput(DEFAULT_HEX);
        setResult(DEFAULT_RESULT);
        setError("");
    }, []);


    return {
        inputFormat,
        rawInput,
        result,
        error,


        onRawChange,
        onFormatChange,
        onPickerChange,
        onSwatchClick,

        copyValue,
        copyAll,

        clear,
    };
};