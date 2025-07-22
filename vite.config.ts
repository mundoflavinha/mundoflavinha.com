import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "/",
  server: { host: "0.0.0.0", port: 5173 },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssr: {
    noExternal: ['react-helmet-async']
  },
  build: {
    rollupOptions: {
      external: (id) => {
        // Não externalize react-helmet-async no build
        if (id === 'react-helmet-async') return false;
        return false;
      }
    }
  }
})