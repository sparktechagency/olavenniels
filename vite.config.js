import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/ *** http://13.62.91.46:3000
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3001,
    host: "0.0.0.0",
    allowedHosts: ["13.62.91.46"],
  },
  preview: {
    port: 3001,
    host: "0.0.0.0",
    allowedHosts: ["13.62.91.46"],
  },
});
// export default defineConfig({
//   optimizeDeps: {
//     include: ["react", "react-dom", "antd"],
//   },
//   server: {
//     host: "0.0.0.0",
//     port: 3001,
//     allowedHosts: ["13.49.70.96"],
//   },
//   preview: {
//     host: "0.0.0.0",
//     port: 3001,
//     allowedHosts: ["13.49.70.96", "localhost"],
//   },
//   plugins: [react(), tailwindcss()],
//   build: {
//     rollupOptions: {
//       onwarn(warning, defaultHandler) {
//         if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
//           return;
//         }
//         defaultHandler(warning);
//       },
//     },
//   },
//   esbuild: {
//     supported: {
//       "top-level-await": true,
//     },
//   },
// });
