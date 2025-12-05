import { transformFile } from "@swc/core";
import { glob } from "glob";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const SRC_DIR = "src";

const components = await glob("*.tsx", {
  cwd: SRC_DIR,
});

const dist = join(process.cwd(), "dist");
if (!existsSync(dist)) {
  await mkdir(dist);
}

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

  await writeFile(join(dist, name.replace(".tsx", ".js")), code);
});

await Promise.all(promises);
