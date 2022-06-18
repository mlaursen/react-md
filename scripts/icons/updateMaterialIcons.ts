import glob from "glob";
import lodash from "lodash";
import { mkdir, rm } from "node:fs/promises";
import { join } from "node:path";

import {
  MATERIAL_ICONS_SRC,
  TEMP_MATERIAL_ICONS_FOLDER,
} from "../constants.js";
import { createIndexFiles, createSvgIcon } from "./create.js";
import type { IconCollection } from "./types.js";
import { getComponentName, getIconType } from "./utils.js";

async function run(): Promise<void> {
  const svgs = glob.sync("**/24px.svg", { cwd: TEMP_MATERIAL_ICONS_FOLDER });
  const collection: IconCollection = {
    filled: {},
    outlined: {},
    rounded: {},
    sharp: {},
    twotone: {},
  };

  const chunked = lodash.chunk(svgs, 50);

  if (process.argv.find((arg) => /--clean|-c/.test(arg))) {
    await rm(MATERIAL_ICONS_SRC, { recursive: true });
    await mkdir(MATERIAL_ICONS_SRC);
  }

  for (const chunk of chunked) {
    await Promise.all(
      chunk.map(async (iconPath) => {
        const sourceFilePath = join(TEMP_MATERIAL_ICONS_FOLDER, iconPath);

        // the current structure of the material-icons repo is:
        // src/
        //   [category]/
        //     [snake_case_name]/
        //       materialicons[type?]/
        //         24px.svg
        const [category, snakeCaseName, materialIconType] = iconPath.split("/");
        const iconType = getIconType(materialIconType);
        const componentName = getComponentName(snakeCaseName);

        await createSvgIcon({
          category,
          iconType,
          componentName,
          sourceFilePath,
        });

        if (!collection[iconType][category]) {
          collection[iconType][category] = [];
        }
        collection[iconType][category].push(componentName);
      })
    );
  }

  await createIndexFiles(collection);
}

run();
