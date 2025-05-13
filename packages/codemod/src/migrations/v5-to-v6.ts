/* eslint-disable no-console */
import confirm from "@inquirer/confirm";
import rawlist from "@inquirer/rawlist";

import { type AvailableTransforms } from "../utils/getAvailableTransforms.js";
import { getFilesToTransform } from "../utils/getFilesToTransform.js";
import { getParser } from "../utils/getParser.js";
import { runJscodeshift } from "../utils/runJscodeshift.js";
import { sassMigrator } from "../utils/sassMigrator.js";
import { type ProgramOptions } from "../utils/types.js";

const version = "v5-to-v6";

export interface MigrateOptions extends AvailableTransforms, ProgramOptions {
  files: readonly string[];
}

async function convertMaterialIcons(): Promise<string> {
  return await rawlist({
    message: "How would you like to convert the material-icons package?",
    choices: [
      {
        name: "Do nothing. It was never used",
        value: "preset-to-noop",
      },
      {
        name: "Convert to Font Icons",
        value: "preset-to-font",
      },
      {
        name: "Convert to SVG Icons",
        value: "preset-to-svg",
      },
      {
        name: "Convert to Symbols",
        value: "preset-to-symbol",
      },
    ],
  });
}

async function automatic(options: MigrateOptions): Promise<boolean> {
  if (
    !options.autoConfirm &&
    !(await confirm({
      message:
        "Do you just want to run all the codemods in the recommended order?",
    }))
  ) {
    return false;
  }

  const { getValidTransformFile } = options;
  const transform = await convertMaterialIcons();

  runJscodeshift({
    ...options,
    transform: getValidTransformFile(`${version}/${transform}`),
  });
  return true;
}

export async function migrate(options: MigrateOptions): Promise<void> {
  const { versionedTransforms, getValidTransformFile } = options;
  options.files = await getFilesToTransform(options.files);
  options.parser = await getParser(options.parser);

  const transforms = versionedTransforms.get(version);
  if (!transforms) {
    process.exit(1);
  }

  if (!(await automatic(options))) {
    const remainingTransforms = new Set(transforms);
    remainingTransforms.forEach((transform) => {
      if (
        transform.startsWith("preset") ||
        transform.startsWith("post-optimizations")
      ) {
        remainingTransforms.delete(transform);
      }
    });

    let ranAll = false;
    for (const transform of remainingTransforms) {
      const [, currentTransform] = transform.split("/");
      const isAll = currentTransform === "all";
      if (isAll) {
        ranAll = false;
      }

      if (!ranAll && (await confirm({ message: `Run ${transform}?` }))) {
        ranAll ||= isAll;
        runJscodeshift({
          ...options,
          transform: getValidTransformFile(`${version}/${transform}`),
        });
      }
    }
  }

  if (
    await confirm({
      message: "Do you want to run the sass migrations?",
    })
  ) {
    await sassMigrator({
      dry: options.dry,
      // remove files that have an extension
      files: options.files.filter((name) => !/\.[^/.]+$/.test(name)),
      version,
    });
  }

  if (
    await confirm({
      message: "Do you want to run the post-optimizations codemods?",
    })
  ) {
    runJscodeshift({
      ...options,
      transform: getValidTransformFile("v5-to-v6/post-optimizations/all"),
    });
    console.log();
    console.log();
    console.log(`Manually switch from the \`react-md\` package to \`@react-md/core\`:

npm uninstall react-md && npm install -S @react-md/core

yarn remove react-md && yarn add @react-md/core

pnpm remove react-md && pnpm add @react-md/core
`);
  }

  console.log(
    "🎉 The v5-to-v6 migration has completed. Please review all the changed files for any TODO comments and the official changelog for things that could not be automigrated."
  );
}
