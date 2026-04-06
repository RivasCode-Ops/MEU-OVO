import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** Deploy na raiz (Cloudflare/Render) = "/". GitHub Pages em /repo/ = defina VITE_BASE_PATH=/nome-do-repo/ no build. */
const base = process.env.VITE_BASE_PATH ?? "/";

export default defineConfig({
  base,
  plugins: [react()],
});
