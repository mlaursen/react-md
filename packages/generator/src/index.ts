/* tslint:disable:no-console */
import commander from "commander";
import now from "performance-now";
import prettyMS from "pretty-ms";

import typedoc from "./typedoc";
import { ITypeDocConfig } from "./types.d";

function run(promise: Promise<any>, commandName: string): Promise<void> {
  console.log(`Starting ${commandName}...`);
  const startTime = now();
  return promise.then(() => {
    console.log("Completed in %s", prettyMS(now() - startTime));
  });
}

commander
  .command("typedoc [options]")
  .option(
    "--no-clean",
    "Updates the command so that the temp folders for typedoc generation are not removed once completed"
  )
  .option(
    "--no-combine",
    "Updates the command so that all the typedocs are not recompiled and combined"
  )
  .option(
    "--strict",
    "Updates the command to throw errors and crash when undocumented code is found"
  )
  .action((_, config: ITypeDocConfig) => run(typedoc(config), "typedoc"));

commander.parse(process.argv);
