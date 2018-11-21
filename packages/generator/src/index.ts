/* tslint:disable:no-console */
import commander from "commander";
import now from "performance-now";
import prettyMS from "pretty-ms";

import typedoc from "./typedoc";

async function run(promise: Promise<any>, commandName: string) {
  console.log(`Starting ${commandName}...`);
  const startTime = now();
  await promise;
  console.log("Completed in %s", prettyMS(now() - startTime));
}

commander
  .command("typedoc [options]")
  .option(
    "--no-clean",
    "Updates the command so that the temp folders for typedoc generation are not " +
      "removed once completed"
  )
  .option(
    "-a",
    "Updates the command so that all packages have typedoc generated instead of a single one."
  )
  .option(
    "-p [name]",
    "Updates the command to only include the provided package instead using the current working " +
      "directory or all packages"
  )
  .action((_, program: any) => {
    const clean: boolean = program.clean;
    const all: boolean = program.A === true;
    let packageName: string = "";
    if (typeof program.P === "string") {
      packageName = program.P;
    }

    run(typedoc({ clean, all, packageName }), "typedoc");
  });

commander.parse(process.argv);
