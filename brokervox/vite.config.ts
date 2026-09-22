import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base so the build works both at brokervox.com/ and at
// dibs-financial.github.io/brokervox/ (project subpath) without a rebuild.
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: { outDir: "dist", emptyOutDir: true },
});
