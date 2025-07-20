import react from "@vitejs/plugin-react-swc";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    // use full path so that neotest works correctly. otherwise it
    // resolves from git root
    setupFiles: join(
      dirname(fileURLToPath(import.meta.url)),
      "vitest.setup.ts"
    ),
    // I do not like having tests in the same folders as the rest of the files
    include: ["**/__tests__/*.(c|m)?[jt]s?(x)"],
  },
});
