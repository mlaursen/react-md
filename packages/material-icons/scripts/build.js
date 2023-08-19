import { transformFile } from "@swc/core";
import { glob } from "glob";
import { rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

const TYPE_DEFINITION = `/// <reference types="react" />
import { SVGIconProps } from "@react-md/core"
declare const _default: import("react").ForwardRefExoticComponent<SVGIconProps & import("react").RefAttributes<SVGSVGElement>>;
export default _default;
`;

const SRC_DIR = "src";

// clean -- about the same as `rm -f *Icon.d.ts *Icon.js`
const existing = await glob(["*Icon.d.ts", "*Icon.js"]);
await Promise.all(existing.map((fileName) => rm(fileName)));

const components = await glob("*.tsx", {
  cwd: SRC_DIR,
});

const promises = components.map(async (name) => {
  const { code } = await transformFile(join(SRC_DIR, name), {
    jsc: {
      parser: {
        syntax: "typescript",
        tsx: true,
      },
      transform: {
        react: {
          runtime: "automatic",
        },
      },
    },
    env: {
      targets: ["defaults"],
    },
  });

  await writeFile(name.replace(".tsx", ".js"), code);
  // I should be able to create a single .d.ts file in the future once esm is
  // the standard
  await writeFile(name.replace(".tsx", ".d.ts"), TYPE_DEFINITION);
});

await Promise.all(promises);
