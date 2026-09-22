import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Custom domain (brokervox.com via CNAME) serves from the root, so base stays "/".
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: { outDir: "dist", emptyOutDir: true },
});
