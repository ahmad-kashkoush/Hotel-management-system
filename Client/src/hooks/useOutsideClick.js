import { useEffect, useRef } from "react";

function useOutsideClick(handler) {
    const ref = useRef(null);
    useEffect(() => {
        const callback = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                handler(e);
            }
        };
        document.addEventListener("click", callback, true);
        return () => document.removeEventListener("click", callback, true);
    }, [handler]);
    return { ref };

}
export { useOutsideClick };

