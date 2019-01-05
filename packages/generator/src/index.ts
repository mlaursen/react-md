import commander from "commander";
import now from "performance-now";
import prettyMS from "pretty-ms";

import typedoc from "./typedoc";

async function run(commandName: string, promiseFn: () => Promise<any>) {
  console.log(`Starting ${commandName}...`);
  console.log();
  const startTime = now();
  await promiseFn();
  console.log("Completed in %s", prettyMS(now() - startTime));
  console.log();
}

commander
  .command("typedoc [options...]")
  .option(
    "--no-clean",
    "Updates the command so that the temp folders for typedoc generation are not " +
      "removed once completed"
  )
  .option("-d", "Updates the command to print debug information as well as the default info")
  .option(
    "--out <filename>",
    "Updates the command to print all the output into the provided " + "file as well."
  )
  .option(
    "-p <name>",
    "Updates the command to only include the provided package instead using the current working " +
      "directory or all packages"
  )
  .action((_, program: any) => {
    const debug = program.D === true;
    const clean = program.clean === true;
    let packageName = "";
    if (typeof program.P === "string") {
      packageName = program.P;
    }

    let outFile = "";
    if (typeof program.out === "string") {
      outFile = `${program.out}.log`;
    }

    run("typedoc", () => typedoc({ clean, packageName }));
  });

commander.parse(process.argv);
