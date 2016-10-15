#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const sassdoc = require('sassdoc');

const reactMD = path.resolve(process.cwd(), '..');

sassdoc(path.join(reactMD, 'src2', 'scss'), {
  dest: path.resolve(process.cwd(), 'dist', 'client', 'sassdoc'),
  package: path.join(reactMD, 'package.json'),
  display: {
    alias: true,
    access: ['public'],
  },
  googleAnalytics: 'UA-76079335-1',
});

sassdoc.parse(path.join(reactMD, 'src2', 'scss', '_grid.scss'))
  .then(data => {
    fs.outputFile(
      path.resolve(process.cwd(), 'src', 'shared', 'components', 'Grids', 'grid-sassdoc.json'),
      JSON.stringify(data)
    );
  });
