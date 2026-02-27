import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);

        // Handle Vite chunk loading errors automatically
        // This commonly happens when a new version is deployed and the browser tries 
        // to load an old chunk that no longer exists.
        const errorString = error.toString();
        if (errorString.includes("Failed to fetch dynamically imported module") ||
            errorString.includes("Importing a module script failed") ||
            errorString.includes("error loading dynamically imported module")) {

            // Avoid infinite reload loops by checking a session flag
            const lastReload = sessionStorage.getItem("last-chunk-error-reload");
            const now = Date.now();

            // If we haven't reloaded for this error in the last 10 seconds, reload now
            if (!lastReload || now - parseInt(lastReload) > 10000) {
                sessionStorage.setItem("last-chunk-error-reload", now.toString());
                window.location.reload();
            }
        }
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 text-gray-900">
                    <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-lg border border-red-100">
                        <h1 className="text-xl font-bold text-red-600 mb-2">Something went wrong</h1>
                        <p className="text-sm text-gray-600 mb-4">The application crashed. Here is the error:</p>
                        <pre className="bg-gray-100 p-4 rounded text-xs font-mono overflow-auto max-h-48 mb-4 border border-gray-200">
                            {this.state.error?.toString()}
                        </pre>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full py-2 bg-[#652b32] text-white rounded-lg hover:bg-[#652b32]/90 transition-colors font-medium"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
