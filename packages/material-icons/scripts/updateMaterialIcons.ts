import { wait } from "@react-md/core/utils/wait";
import { glob } from "glob";
import lodash from "lodash";
import { execSync } from "node:child_process";
import { rm } from "node:fs/promises";
import { join } from "node:path";
import prettyMilliseconds from "pretty-ms";

import { createCoreMetadataFIle } from "./utils/createCoreMetadataFile.js";
import { createDocsMetadataFile } from "./utils/createDocsMetadataFile.js";
import { createIconComponent } from "./utils/createIconComponent.js";
import { getMaterialMetadata } from "./utils/getMaterialMetadata.js";

console.log("Generating material icon components...");

const startTime = Date.now();
const projectRoot = execSync("git rev-parse --show-toplevel").toString().trim();
const metadata = await getMaterialMetadata();
const materialIconsSrc = join(projectRoot, "packages", "material-icons", "src");

await createDocsMetadataFile(metadata, projectRoot);
await createCoreMetadataFIle(metadata, projectRoot);

const { components } = metadata;
const existingComponents = await glob("*.tsx", {
  cwd: materialIconsSrc,
});

const total = components.length;
console.log(`Creating ${total} icon components ... `);

let remaining = total;
const chunks = lodash.chunk(components, 50);
const created = new Set<string>();
for (const requests of chunks) {
  await Promise.all(
    requests.map((req) =>
      createIconComponent({
        ...req,
        created,
        iconNameFixes: metadata.iconNameFixes,
        materialIconsSrc,
      })
    )
  );
  remaining -= requests.length;
  console.log(`${remaining} icons remaining ... `);

  await wait(1000);
}

const toRemove = lodash.difference(existingComponents, [...created]);
await Promise.all(
  toRemove.map((fileName) => rm(join(materialIconsSrc, fileName)))
);

const totalDuration = Date.now() - startTime;
console.log(`Completed in ${prettyMilliseconds(totalDuration)}!`);
