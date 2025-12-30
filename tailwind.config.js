/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",          // For Vite's index.html
    "./src/**/*.{js,ts,jsx,tsx}",  // Scan all JS/TS/JSX/TSX files in src
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        gold: "hsl(var(--gold))",  // Custom color used in your code (e.g., for gold accents)
        // Add more custom colors as needed (e.g., muted, accent)
      },
    },
  },
  plugins: [],
};