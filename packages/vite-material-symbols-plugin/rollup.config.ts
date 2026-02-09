import { nodeResolve } from "@rollup/plugin-node-resolve";
import { type RollupOptions } from "rollup";
import { dts } from "rollup-plugin-dts";
import { defineRollupSwcOption, swc } from "rollup-plugin-swc3";

const external = (id: string): boolean => !/^[./]/.test(id);

export default [
  {
    input: "./src/index.ts",
    output: {
      file: "./dist/index.js",
      format: "es",
      sourcemap: false,
    },
    external,
    plugins: [nodeResolve(), swc(defineRollupSwcOption({ sourceMaps: false }))],
  },
  {
    input: "./types/index.d.ts",
    output: {
      file: "./dist/index.d.ts",
      sourcemap: false,
    },
    external,
    plugins: [dts()],
  },
] satisfies RollupOptions[];
