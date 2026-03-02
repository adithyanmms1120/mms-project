import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToHash = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const id = hash.replace("#", "");
            const attemptScroll = (retryCount = 0) => {
                const element = document.getElementById(id);
                if (element) {
                    const offset = 80; // Offset for fixed header
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = element.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: pathname === "/" ? "smooth" : "auto",
                    });
                } else if (retryCount < 10) {
                    // If element not found, retry (handles lazy loading)
                    setTimeout(() => attemptScroll(retryCount + 1), 100);
                }
            };

            attemptScroll();
        } else {
            // If no hash and we just changed pages, scroll to top
            window.scrollTo({ top: 0, behavior: "auto" });
        }
    }, [pathname, hash]);

    return null;
};

export default ScrollToHash;
