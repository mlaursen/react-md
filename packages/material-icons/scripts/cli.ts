#!/usr/bin/env node

import commander from "commander";

import download from "./download";
import flatten from "./flatten";
import create from "./create";

commander
  .command("download [options...]")
  .option("-v, --version [version]")
  .action((_, program: { version?: string }) => {
    download(typeof program.version === "string" ? program.version : "");
  });

commander.command("flatten").action(() => {
  flatten();
});

commander.command("create").action(() => {
  create();
});

commander.parse(process.argv);
// commander
//   .usage("<version> [options...]")
//   .option("-d, --download-only [downloadOnly]")
//   .option("-i, --icons-only [iconsOnly]")
//   .option("-u, --update-only [updateOnly]")
//   .option("-c, --clean [clean]")
//   .option("--no-cleanup")
//   .action((program: IOptions & any) => {
//     const { version } = program;
//     console.log("version:", version);
//     console.log("program.args:", program.args);
//   })
//   .parse(process.argv);
