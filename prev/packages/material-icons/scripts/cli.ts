#!/usr/bin/env node

import commander from "commander";

import { download } from "./download";
import { flatten } from "./flatten";
import { create } from "./create";
import { update } from "./update";

commander
  .command("download [options...]")
  .description(
    "Download all the svgs from the material icons github into a temp directory"
  )
  .option("-t, --tag [tag]")
  .action((_, program: { tag?: string }) => {
    download(typeof program.tag === "string" ? program.tag : "");
  });

commander
  .command("flatten")
  .description(
    "Requires the svgs to be downloaded from the `download` command and copies all the unique icons into the svgs directory"
  )
  .action(() => flatten());

commander
  .command("create")
  .description("Creates all the icon component files")
  .action(() => create());

commander
  .command("update")
  .description("Runs all the commands at once in order.")
  .action(() => update());

commander.parse(process.argv);
