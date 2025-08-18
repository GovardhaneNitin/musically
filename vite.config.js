import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
// Set the correct base path for GitHub Pages project deployment
// Replace 'musically' if the repository name changes.
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // For local dev we still serve from root. For production build (GH Pages) we set base.
  base: mode === "production" ? "/musically/" : "/",
}));
