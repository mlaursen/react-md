#!/usr/bin/env node

const path = require('path');
const sassdoc = require('sassdoc');
const fs = require('fs-extra');

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

sassdoc.parse(path.join(reactMD, 'src2', 'scss'), {
  display: {
    alias: true,
    access: ['public'],
  },
}).then(data => {
  const sassdocs = {};
  data.forEach(sassdoc => {
    if (sassdoc.access === 'private') { return; }
    const id = sassdoc.group;

    sassdocs[id] = sassdocs[id] || [];
    sassdocs[id].push(sassdoc);
  });

  Object.keys(sassdocs).forEach(key => {
    fs.outputFile(
      path.resolve(process.cwd(), 'src', 'sassdocs', `${key}.json`),
      JSON.stringify(sassdocs[key])
    );
  });
});
