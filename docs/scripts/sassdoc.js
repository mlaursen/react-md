#!/usr/bin/env node

const path = require('path');
const sassdoc = require('sassdoc');

const reactMD = path.resolve(process.cwd(), '..');

sassdoc(path.join(reactMD, 'src', 'scss'), {
  dest: path.resolve(process.cwd(), 'dist', 'client', 'sassdoc'),
  package: path.join(reactMD, 'package.json'),
  display: {
    alias: true,
    access: ['public'],
  },
  googleAnalytics: 'UA-76079335-1',
});
