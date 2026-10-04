import { fileURLToPath } from "url";

export default {
  plugins: {
    // Point at the config explicitly so it is found even when Vite is started from another folder
    tailwindcss: { config: fileURLToPath(new URL("./tailwind.config.js", import.meta.url)) },
    autoprefixer: {},
  },
}
