import * as commander from "commander";

import createFolderStructure from "./utils/createFolderStructure";

commander
  .usage("<command> [options] [packages...]");

commander.command("template [packages...]")
  .option("--no-sassdoc", "Updates the template to not include anything related to SassDoc and Scss.")
  .option("--no-proptypes", "Updates the template to not include anything related to component documentation")
  .action((packages, { sassdoc, proptypes }) => {
    console.log("Creating templates for the following packages: ", packages);
    Promise.all(packages.map(name => createFolderStructure(name, proptypes, sassdoc)))
      .then(() => {
        console.log("Done!");
      });
  });

commander.parse(process.argv);
