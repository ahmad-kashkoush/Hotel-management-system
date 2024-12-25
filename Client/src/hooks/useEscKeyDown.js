import { useEffect, useRef } from "react";

function useEscKeyDown(handler) {
    const ref = useRef(null);
    useEffect(() => {
        const callback = (e) => {
            if (ref.current && e.key === "Escape") handler();
        };

        window.addEventListener("keydown", callback);
        return () => window.removeEventListener("keydown", callback);
    }, [handler]);

    return { ref };
}
export { useEscKeyDown };