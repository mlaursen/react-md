import { type ReactElement } from "react";

import TestFrameworkCodeBlock from "../TestFrameworkCodeBlock.jsx";

export default function TestConfigCodeBlock(): ReactElement {
  return (
    <TestFrameworkCodeBlock
      lang="diff"
      fileName={{
        jest: "jest.config.ts",
        vitest: "vite.config.ts",
      }}
      code={{
        jest: ` import { type Config } from "jest";

 const config: Config = {
   testEnvironment: "jsdom",
+  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
 };

 export default config;
`,
        vitest: ` import react from "@vitejs/plugin-react-swc";
 import { defineConfig } from "vite";

 // https://vite.dev/config/
 export default defineConfig({
   plugins: [react()],
   test: {
     environment: "jsdom",
     globals: true,
+    setupFiles: "./src/testSetup.ts",
   },
 });
`,
      }}
    />
  );
}
