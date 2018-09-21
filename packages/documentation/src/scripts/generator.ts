import * as commander from "commander";

import template from "./template";
import sassdoc from "./sassdoc";

commander.usage("<command> [options] [packages...]");

interface ITemplateOptions {
  sassdoc: boolean;
  proptypes: boolean;
  examples: boolean;
}
commander
  .command("template [packages...]")
  .option(
    "--no-sassdoc",
    "Updates the template to not include anything related to SassDoc and Scss."
  )
  .option(
    "--no-proptypes",
    "Updates the template to not include anything related to component documentation"
  )
  .option("--no-examples", "Updates the template to not generate the examples folder")
  .action((packages, command) => {
    const {
      sassdoc: includeSassDoc,
      proptypes: includePropTypes,
      examples,
    } = command as ITemplateOptions;

    console.log("Creating templates for the following packages: ", packages);
    Promise.all(
      packages.map(name => template(name, includePropTypes, includeSassDoc, examples))
    ).then(() => {
      console.log("Done!");
    });
  });

interface ISassDocOptions {
  clean: boolean;
}
commander
  .command("sassdoc [options]")
  .option(
    "--no-clean",
    "Updates the command so that the temp folder of styles will not be removed after being run"
  )
  .action((_, command) => {
    const { clean } = command as ISassDocOptions;
    console.log("Creating SassDoc...");
    sassdoc(clean).then(() => {
      console.log("Done!");
    });
  });

commander.parse(process.argv);
