// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  devToolbar: { enabled: false },

  vite: {
    plugins: [tailwindcss()],
    server: {allowedHosts: 'ohio-example.gl.at.ply.gg'}
  },
});
