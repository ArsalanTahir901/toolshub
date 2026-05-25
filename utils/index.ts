import toast from "react-hot-toast";
import { ReactNode, isValidElement } from "react";

interface CopyToClipboardProps {
    value: string;
    successMsg?: string;
    errorMsg?: string;
}

export const copyToClipboard = async ({
    value,
    errorMsg = 'Copy failed',
    successMsg = 'Copied!'
}: CopyToClipboardProps) => {
    await navigator.clipboard.writeText(value)
        .then(() => toast.success(successMsg))
        .catch(() => toast.error(errorMsg));
}


export const getAriaLabel = (trigger: ReactNode): string => {
    if (typeof trigger === "string" || typeof trigger === "number") {
        return String(trigger);
    }

    if (isValidElement(trigger)) {
        const props = trigger.props as { children?: ReactNode; "aria-label"?: string };

        // Prefer explicit aria-label first
        if (props["aria-label"]) {
            return props["aria-label"];
        }

        // If child is text
        if (
            typeof props.children === "string" ||
            typeof props.children === "number"
        ) {
            return String(props.children);
        }
    }

    return "Popover trigger";
};