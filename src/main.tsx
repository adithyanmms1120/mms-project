import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "./components/ErrorBoundary";
import App from "./App.tsx";
import "./index.css";

const root = createRoot(document.getElementById("root")!);

root.render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>
);

// Inform prerenderer that the app has mounted
window.addEventListener("load", () => {
    setTimeout(() => {
        document.dispatchEvent(new Event("custom-render-trigger"));
    }, 1500); // 1.5s delay to ensure content/APIs load before snapshot
});

// Register Service Worker for image caching and fast loading
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
