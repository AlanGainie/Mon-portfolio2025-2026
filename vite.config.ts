/// <reference types="vitest" />
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vitest/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup/setupTests.ts",
  },
  base: '/mon-portfolio2025-2026/',
});
