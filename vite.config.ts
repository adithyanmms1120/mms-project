import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// @ts-ignore - plugin missing types for the esnext export
import prerender from "@prerenderer/rollup-plugin";
// @ts-ignore
import renderPuppeteer from "@prerenderer/renderer-puppeteer";
import fs from "fs";

export default defineConfig(({ mode }) => {
  let routes = ["/"];
  try {
    const routesPath = path.resolve(__dirname, "scripts/routes.json");
    if (fs.existsSync(routesPath)) {
      routes = JSON.parse(fs.readFileSync(routesPath, "utf-8"));
    }
  } catch (e) {
    console.warn("Could not read scripts/routes.json. Using fallback routes.");
  }

  const isBuild = mode === "production" || process.env.NODE_ENV === "production";

  return {
    base: "/",
    plugins: [
      react(),
      isBuild && prerender({
        routes,
        renderer: new renderPuppeteer({
          renderAfterDocumentEvent: "custom-render-trigger", // wait for app to mount
          headless: true,
          args: ["--no-sandbox", "--disable-setuid-sandbox"]
        }),

      }),
    ],
    assetsInclude: ["**/*.JPG", "**/*.JPEG"],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: "dist",
      assetsDir: "assets",
      emptyOutDir: true,
      modulePreload: true, // CRITICAL: Disable to prevent preload fetch errors on certain servers
      cssCodeSplit: true,
      sourcemap: false,
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1200,
      target: "es2020", // Safer target for broad compatibility
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ["console.log", "console.info", "console.debug"],
          passes: 2
        },
        mangle: {
          safari10: true
        },
        format: {
          comments: false
        }
      },
      rollupOptions: {
        output: {
          // Ensure predictable hashing and structure
          entryFileNames: "assets/[name].[hash].js",
          chunkFileNames: "assets/[name].[hash].js",
          assetFileNames: "assets/[name].[hash].[ext]",
          manualChunks: {
            "vendor-core": [
              "react",
              "react-dom",
              "react-router-dom",
              "react-helmet-async"
            ],
            "vendor-animation": ["framer-motion", "gsap"],
            "vendor-icons": ["lucide-react", "react-icons"],
            "vendor-ui": [
              "@radix-ui/react-accordion",
              "@radix-ui/react-dialog",
              "@radix-ui/react-dropdown-menu",
              "@radix-ui/react-tooltip",
              "@radix-ui/react-popover",
              "@radix-ui/react-select",
              "@radix-ui/react-tabs"
            ],
            "vendor-utils": [
              "@tanstack/react-query",
              "zod",
              "react-hook-form",
              "clsx",
              "tailwind-merge",
              "date-fns"
            ]
          }
        }
      }
    }
  };
});