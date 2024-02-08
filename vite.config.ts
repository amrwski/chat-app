import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import { defineConfig } from "vite";

export default defineConfig(() => {
  dotenv.config({ path: "./ .env.local" });

  return {
    plugins: [react()],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "src/tests/setup.ts",
    },
  };
});
