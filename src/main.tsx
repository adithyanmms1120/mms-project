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

// Register Service Worker and handle updates
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);

                // Handle updates: if a new version is found, clear cache and reload
                registration.onupdatefound = () => {
                    const installingWorker = registration.installing;
                    if (installingWorker) {
                        installingWorker.onstatechange = () => {
                            if (installingWorker.state === 'installed') {
                                if (navigator.serviceWorker.controller) {
                                    console.log('New content available; please refresh.');
                                    // Optionally force a reload here if you want to be aggressive
                                    // window.location.reload();
                                }
                            }
                        };
                    }
                };
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

