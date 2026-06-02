import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

const isVercel = process.env.VERCEL === "1";

export default defineConfig({
  output: "server",
  adapter: isVercel
    ? vercel()
    : node({
        mode: "standalone"
      }),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url))
      }
    }
  }
});
