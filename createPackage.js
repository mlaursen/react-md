#!/usr/bin/env node
const commander = require('commander');
const readline = require('readline');
const createPackage = require('./scripts/createPackage');

const VERSION = '2.0.0-alpha-1';

commander
  .version(VERSION)
  .usage('<name> [options] [additionalDependencies...]')
  .option('--no-styles', 'Updates the package structure to not include anything related to styles')
  .option('--no-sassdoc', 'Updates the generated README to not include a section for sassdoc.')
  .option('--no-typescript', 'This will exclude the typescript build scripts from the package.json if enabled.')
  .option('--no-proptypes', 'Updates the generated README to not include a section for documenting component prop types.')
  .option('-t, --custom-types [customTypes]', 'Updates the builds for custom type definitions in a src/types.d.ts file')
  .option('-d, --description [description]', 'Updates both the README and the package.json to include the description string.')
  .option('-p, --private [isPrivate]', 'This will make the package private so it will never be published to npm.')
  .arguments('<name> [dependencies...]')
  .action((name, additionalDependencies, program) => {
    const description = typeof program.description === 'string' ? program.description : '';
    const {
      isPrivate,
      customTypes,
      styles,
      sassdoc,
      typescript,
      proptypes: propTypes,
    } = program;

    if (!name) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      const prompt = () => rl.question('Enter a package name: ', (packageName) => {
        if (!packageName) {
          prompt();
          return;
        }
        name = packageName;

        rl.close();
      });

      prompt();
    }

    createPackage({
      name,
      description,
      version: VERSION,
      isPrivate,
      styles,
      sassdoc: styles && sassdoc,
      typescript,
      propTypes: typescript && propTypes,
      customTypes: typescript && customTypes,
      additionalDependencies,
    });
  })
  .parse(process.argv);
