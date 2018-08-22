import * as commander from "commander";

import template from "./template";
import sassdoc from "./sassdoc";

commander
  .usage("<command> [options] [packages...]");

commander.command("template [packages...]")
  .option("--no-sassdoc", "Updates the template to not include anything related to SassDoc and Scss.")
  .option("--no-proptypes", "Updates the template to not include anything related to component documentation")
  .option("--no-examples", "Updates the template to not generate the examples folder")
  .action((packages, { sassdoc: includeSassDoc, proptypes: includePropTypes, examples }) => {
    console.log("Creating templates for the following packages: ", packages);
    Promise.all(packages.map(name => template(name, includePropTypes, includeSassDoc, examples)))
      .then(() => {
        console.log("Done!");
      });
  });

commander.command("sassdoc [packages...]")
  .action(packages => {
    console.log("Creating sassdoc for the following packages: ", packages);
    Promise.all(packages.map(sassdoc)).then(() => {
      console.log("Done!");
    });
  });

commander.parse(process.argv);
