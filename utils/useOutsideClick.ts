import { RefObject, useEffect, useState } from "react";

interface UseClickOutsideOptions<T extends HTMLElement> {
    ref: RefObject<T | null>;
    initialState?: boolean;
}

export const useClickOutside = <T extends HTMLElement>({
    ref,
    initialState = false,
}: UseClickOutsideOptions<T>) => {
    const [isActive, setIsActive] = useState(initialState);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!ref.current) return;

            if (!ref.current.contains(event.target as Node)) {
                setIsActive(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    const toggle = () => setIsActive((prev) => !prev);
    const open = () => setIsActive(true);
    const close = () => setIsActive(false);

    return {
        isActive,
        setIsActive,
        toggle,
        open,
        close,
    };
};