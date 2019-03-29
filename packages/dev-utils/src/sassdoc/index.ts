import fs from "fs-extra";
import {
  FunctionSassDoc,
  Item,
  MixinSassDoc,
  parse,
  VariableSassDoc,
} from "sassdoc";
import { tempStylesFolder } from "../paths";
import {
  copyFiles,
  geScopedPackageNames,
  glob,
  list,
  log,
  time,
} from "../utils";
import {
  formatMixinSassDoc,
  formatVariableSassDoc,
  formatFunctionSassDoc,
} from "./format";
import { SassDocReference } from "./types";

function filterBy<T extends VariableSassDoc | FunctionSassDoc | MixinSassDoc>(
  sassdocs: Item[],
  type: "variable" | "function" | "mixin"
) {
  return sassdocs.filter(item => item.context.type === type) as T[];
}

async function run(clean: boolean) {
  const packages = await geScopedPackageNames({ filter: "scss" });
  const pattern = `../+(${packages.join("|")})/src/*.scss`;
  log("Using the following glob pattern for finding sassdoc:");
  log(list([pattern]));
  log();

  const files = await glob(pattern);

  log("Moving all the found files into the temp styles folder...");
  await fs.remove(tempStylesFolder);
  await fs.ensureDir(tempStylesFolder);
  await copyFiles(files, tempStylesFolder, {
    noLog: true,
    replace: src => src.replace("../", "").replace("src", "dist"),
  });

  log("Compiling the sassdocs...");
  log();
  const sassdocs = await parse(tempStylesFolder);
  const references: SassDocReference[] = sassdocs.map(
    ({ access, context: { name, type }, group }) => ({
      name,
      type,
      group: group[0],
      private: access === "private",
    })
  );
  const publicSassDocs = sassdocs.filter(({ access }) => access !== "private");

  log("Formatting all the variables...");
  const variables = filterBy<VariableSassDoc>(publicSassDocs, "variable").map(
    v => formatVariableSassDoc(v, references)
  );

  log("Formatting all the functions...");
  const functions = filterBy<FunctionSassDoc>(publicSassDocs, "function").map(
    f => formatFunctionSassDoc(f, references, packages)
  );

  log("Formatting all the mixins...");
  const mixins = filterBy<MixinSassDoc>(publicSassDocs, "mixin").map(m =>
    formatMixinSassDoc(m, references, packages)
  );

  if (clean) {
    log("Cleaning up the temp styles folder...");
    await fs.remove(tempStylesFolder);
  }

  log();
}

export default async function sassdoc(clean: boolean) {
  time(() => run(clean), "sassdoc");
}
