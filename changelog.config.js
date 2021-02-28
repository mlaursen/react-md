const { readFileSync } = require('fs');
const { resolve } = require('path');

const { tokens, packages } = require('./changelogData');

const PACKAGE_REGEXP = new RegExp(`${packages.join('|')}`);

const GROUPS = [
  'Bug Fixes',
  'Features',
  'Documentation',
  'Performance Improvements',
  'Other Internal Changes',
];

function getCommitType({ type, scope, revert }) {
  if (type === 'revert' || revert) {
    return 'Reverts';
  }

  if (scope === 'docs') {
    return 'Documentation';
  }

  switch (type) {
    case 'feat':
      return 'Features';
    case 'fix':
    case 'bugfix':
      return 'Bug Fixes';
    case 'perf':
      return 'Performance Improvements';
    case 'docs':
      return 'Documentation';
    default:
      return 'Other Internal Changes';
  }
}

function getCommitScope({ scope }) {
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
}

const TOKEN_REGEXP = new RegExp(
  `(?<=\\s|^)(${tokens.join('|')})(?=\\s|$)`,
  'g'
);

function tokenize(subject) {
  return subject
    .replace(TOKEN_REGEXP, '`$1`')
    .replace(/([a-z][A-z]+Props)/g, '`$1`');
}

const parserOpts = {
  headerPattern: /^(\w*)(?:\((.*)\))?: (.*)$/,
  headerCorrespondence: ['type', 'scope', 'subject'],
  noteKeywords: ['BREAKING CHANGE'],
  revertPattern: /^(?:Revert|revert:)\s"?([\s\S]+?)"?\s*This reverts commit (\w*)\./i,
  revertCorrespondence: ['header', 'hash'],
};

const writerOpts = {
  transform: (commit, context) => {
    // don't want to show the release tag in changelog
    if (commit.scope === 'release') {
      return;
    }

    const issues = [];
    let isBreaking = false;
    commit.notes.forEach((note) => {
      isBreaking = false;
      note.title = 'BREAKING CHANGES';
    });

    commit.type = getCommitType(commit);
    commit.scope = getCommitScope(commit);
    if (!isBreaking && (!commit.type || commit.scope.includes('deps'))) {
      // don't include un-typed commits in changelogs or deps
      return;
    }

    if (typeof commit.hash === 'string') {
      commit.shortHash = commit.hash.substring(0, 7);
    }

    if (typeof commit.subject === 'string') {
      let url = context.repository
        ? `${context.host}/${context.owner}/${context.repository}`
        : context.repoUrl;

      if (url) {
        url = `${url}/issues/`;
        commit.subject = commit.subject.replace(/#([0-9]+)/g, (_, issue) => {
          issues.push(issue);
          return `[#${issue}](${url}${issue})`;
        });
      }

      commit.subject = tokenize(commit.subject);
    }

    // remove references that already appear in the subject
    commit.references = commit.references.filter(
      (reference) => !issues.includes(reference.issue)
    );

    return commit;
  },
  groupBy: 'type',
  commitGroupsSort: function (a, b) {
    const aIndex = GROUPS.indexOf(a.title);
    const bIndex = GROUPS.indexOf(b.title);
    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex;
    }

    return a.title.localeCompare(b.title);
  },
  commitsSort: ['scope', 'subject'],
  noteGroupsSort: 'title',
  mainTemplate: readFileSync(
    resolve(__dirname, './templates/template.hbs'),
    'utf-8'
  ),
  headerPartial: readFileSync(
    resolve(__dirname, './templates/header.hbs'),
    'utf-8'
  ),
  commitPartial: readFileSync(
    resolve(__dirname, './templates/commit.hbs'),
    'utf-8'
  ),
  footerPartial: readFileSync(
    resolve(__dirname, './templates/footer.hbs'),
    'utf-8'
  ),
};

/**
 * This is basically the conventional-changelog-angular with a few changes to
 * allow more commit messages to appear. I also "tokenize" known packages and
 * exports from react-md in the changelogs.
 */
module.exports = {
  parserOpts,
  writerOpts,
  conventionalChangelog: {
    writerOpts,
    parserOpts,
  },
  recommendedBumpOpts: {
    config: {
      parserOpts,
      writerOpts,
    },

    whatBump: (commits) => {
      let level = 2;
      let breaking = 0;
      let features = 0;
      commits.forEach((commit) => {
        if (commit.notes.length > 0) {
          breaking += commit.notes.length;
          level = 0;
        } else if (commit.type === 'feat') {
          features += 1;
          if (level === 2) {
            level = 1;
          }
        }
      });

      const verb = breaking === 1 ? 'is' : 'are';
      return {
        level,
        reason: `There ${verb} ${breaking} BREAKING CHANGES and ${features} features`,
      };
    },
  },
};
