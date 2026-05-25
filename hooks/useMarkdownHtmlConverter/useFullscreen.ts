import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import toast from "react-hot-toast";

export const useFullscreen = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    const toggleFullscreen = useCallback(async () => {
        const el = containerRef.current;

        if (!el) return;

        if (!document.fullscreenElement) {
            try {
                await el.requestFullscreen();
                setIsFullscreen(true);
            } catch {
                toast.error(
                    "Fullscreen not available",
                );
            }
        } else {
            await document.exitFullscreen();
            setIsFullscreen(false);
        }
    },
        [],
    );

    useEffect(() => {
        const sync = () => {
            setIsFullscreen(
                !!document.fullscreenElement,
            );
        };

        document.addEventListener(
            "fullscreenchange",
            sync,
        );

        return () => {
            document.removeEventListener(
                "fullscreenchange",
                sync,
            );
        };
    }, []);

    return {
        containerRef,
        isFullscreen,
        toggleFullscreen,
    };
};