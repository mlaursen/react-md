#!/usr/bin/env node
const commander = require('commander');
const updateReadme = require('./updateReadme');

commander
  .option('--no-toc', 'Disables generating a Table of Contents in the README.')
  .option('--no-proptypes', 'Disables generating a Prop Types section in the README.')
  .option('--no-sassdoc', 'Disables generating a SassDoc section in the README..')
  .parse(process.argv);

const { toc, proptypes, sassdoc } = commander;
updateReadme({ toc, proptypes, sassdoc });
