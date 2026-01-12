/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",          // For Vite's index.html
    "./src/**/*.{js,ts,jsx,tsx}",  // Scan all JS/TS/JSX/TSX files in src
  ],
  theme: {
    extend: {
      colors: {
        border: "var(--border)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        gold: "var(--gold)",
      },
    },
  },
  plugins: [],
};