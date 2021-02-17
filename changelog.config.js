const { createConfig } = require('@mlaursen/changelog-preset/createConfig');

const { tokens, packages } = require('./changelogData');

const PACKAGE_REGEXP = new RegExp(`${packages.join('|')}`);

module.exports = createConfig({
  tokens,
  getCommitScope({ scope }) {
    if (PACKAGE_REGEXP.test(scope)) {
      return `@react-md/${scope}`;
    }

    switch (scope) {
      // these are mostly to create the initial changelog
      case 'docs':
      case 'pages':
      case 'sassdoc':
      case 'sandbox':
      case 'demos':
      case 'blog':
      case 'indexer':
      case 'guides':
        return 'react-md.dev';
      case 'slider':
        return '@react-md/form';
      case 'grid':
        return '@react-md/utils';
      default:
        return scope || '';
    }
  },
});
