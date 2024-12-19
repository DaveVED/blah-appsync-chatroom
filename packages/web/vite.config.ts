import path from "path";
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [viteReact()],
  resolve: {
    alias: {
      /**
       * Simplifies imports using `@` as an alias for the `src` directory.
       * For example: import { Component } from "@/components/Component".
       */
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
