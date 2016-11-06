#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const sassdoc = require('sassdoc');

const root = path.resolve(process.cwd(), '..');
const styles = path.join(root, 'src', 'scss');

sassdoc(styles, {
  dest: path.resolve(process.cwd(), 'dist', 'client', 'sassdoc'),
  package: path.join(root, 'package.json'),
  display: {
    alias: true,
    access: ['public'],
  },
  googleAnalytics: 'UA-76079335-1',
});

sassdoc.parse(path.join(styles, '_grid.scss'))
  .then(data => {
    fs.outputFile(
      path.resolve(process.cwd(), 'src', 'shared', 'components', 'Grids', 'grid-sassdoc.json'),
      JSON.stringify(data)
    );
  });

sassdoc.parse(styles)
  .then(data => {
    const transformed = data.reduce((transformed, sassdoc) => {
      if (sassdoc.access === 'private') {
        return transformed;
      }

      sassdoc.group.forEach(group => {
        transformed[group] = transformed[group] || {
          placeholders: [],
          variables: [],
          functions: [],
          mixins: [],
        };

        transformed[group][`${sassdoc.context.type}s`].push(sassdoc);
      });

      return transformed;
    }, {});

    Object.keys(transformed).forEach(group => {
      fs.outputFile(path.resolve(process.cwd(), 'src', 'sassdocs', `${group}.json`), JSON.stringify(transformed[group]));
    });
  });
