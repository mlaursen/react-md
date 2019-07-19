import fs from "fs-extra";
import path from "path";
import { FunctionSassDoc, MixinSassDoc, parse, VariableSassDoc } from "sassdoc";
import log from "loglevel";

import { documentationRoot, tempStylesFolder, devUtils, src } from "../paths";
import {
  copyFiles,
  geScopedPackageNames,
  glob,
  list,
  time,
  toTitle,
  format,
} from "../utils";
import {
  formatFunctionSassDoc,
  formatMixinSassDoc,
  formatVariableSassDoc,
} from "./format";
import { PackageSassDocRecord, SassDocReference } from "./types.d";

const sassdocDir = path.join(devUtils, src, "sassdoc");
const sassdocTypes = path.join(sassdocDir, "sassdoc.d.ts");
const customTypes = path.join(sassdocDir, "types.d.ts");
const types = [sassdocTypes, customTypes];

async function run(clean: boolean): Promise<void> {
  const packages = await geScopedPackageNames({ filter: "scss" });
  const pattern = `../+(${packages.join("|")})/src/*.scss`;
  log.debug("Using the following glob pattern for finding sassdoc:");
  log.debug(list([pattern]));
  log.debug();

  const files = await glob(pattern);

  log.info("Moving all the found files into the temp styles folder...");
  await fs.remove(tempStylesFolder);
  await fs.ensureDir(tempStylesFolder);
  await copyFiles(files, tempStylesFolder, {
    replace: src => src.replace("../", "@react-md/").replace("src", "dist"),
  });

  log.info("Compiling the sassdocs...");
  const allSassDocs = await parse(tempStylesFolder);
  const references: SassDocReference[] = allSassDocs.map(
    ({ access, context: { name, type }, group }) => ({
      name,
      type,
      group: group[0],
      private: access === "private",
    })
  );
  const sassdocs = allSassDocs.filter(({ access }) => access !== "private");

  log.info("Building the public sassdoc records...");
  const combined = sassdocs.reduce<PackageSassDocRecord>((result, sassdoc) => {
    const [name] = sassdoc.group;
    if (!result[name]) {
      result[name] = {
        name,
        variables: [],
        functions: [],
        mixins: [],
      };
    }
    const pkg = result[name];

    switch (sassdoc.context.type) {
      case "variable":
        pkg.variables.push(
          formatVariableSassDoc(sassdoc as VariableSassDoc, references)
        );
        break;
      case "function":
        pkg.functions.push(
          formatFunctionSassDoc(
            sassdoc as FunctionSassDoc,
            references,
            packages
          )
        );
        break;
      case "mixin":
        pkg.mixins.push(
          formatMixinSassDoc(sassdoc as MixinSassDoc, references, packages)
        );
        break;
      default:
        /* eslint-disable no-console */
        console.error(
          "Unsupported sassdoc type due to bad sassdoc comments or something else."
        );
        console.error();
        console.error(sassdoc);
        process.exit(1);
    }

    return result;
  }, {});

  await copyFiles(types, "types", {
    message:
      "Copying over the type definitions for the sassdoc package and the custom formatted sassdocs.",
    replace: name =>
      name
        .replace("types", "formattedSassDoc")
        .substring(name.indexOf("sassdoc/") + "sassdoc/".length),
  });

  log.info("Generating SassDoc files...");
  await Promise.all(
    Object.entries(combined).map(([name, formatted]) => {
      const fileName = `${toTitle(name)}SassDoc`;
      const filePath = path.join(
        documentationRoot,
        "constants",
        `${fileName}.ts`
      );

      const contents = format(`/* this is a generated file and shouldn't be manually updated */
import { PackageSassDoc } from "types/formattedSassDoc.d";

const ${fileName}: PackageSassDoc = ${JSON.stringify(formatted)};

export default ${fileName};
`);
      return fs.writeFile(filePath, contents, "utf8");
    })
  );

  if (clean) {
    log.info("Cleaning up the temp styles folder...");
    await fs.remove(tempStylesFolder);
  }

  log.info("");
}

export default async function sassdoc(clean: boolean): Promise<void> {
  time(() => run(clean), "sassdoc");
}
