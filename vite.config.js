import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Set the base path to the repository name for correct asset resolution on GitHub Pages
// If you fork/rename the repo, update the base accordingly (e.g. '/new-repo-name/')
export default defineConfig({
  base: '/musically/',
  plugins: [react()],
});
