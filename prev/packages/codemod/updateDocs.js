const glob = require('glob');
const { join } = require('path');
const { execSync, spawnSync } = require('child_process');
const { readFileSync, writeFileSync, existsSync } = require('fs');

const codemod = 'node ./bin/rmd-codemod';
const transforms = glob.sync('**/*.ts', {
  cwd: 'transforms',
  ignore: ['**/__tests__/**', '**/__testfixtures__/**', 'utils/**/*'],
});

const toTs = (fileName) => fileName.substring(0, fileName.length - 1);

const getHelpText = (command = '') => {
  const helpOutput = execSync(`${codemod} ${command} -h`).toString().trim();

  const helpText = `\`\`\`sh
${helpOutput}
\`\`\``;

  if (command) {
    const [folder, transformation] = command.split('/');
    const fixtures = join(
      'transforms',
      folder,
      '__testfixtures__',
      'typescript'
    );

    let input = join(fixtures, `${transformation}.input.tsx`);
    let output = join(fixtures, `${transformation}.output.tsx`);
    if (existsSync(toTs(input)) && existsSync(toTs(output))) {
      input = toTs(input);
      output = toTs(output);
    }

    if (existsSync(input) && existsSync(output)) {
      const args = [
        '--no-pager',
        'diff',
        '--no-index',
        '--ignore-all-space',
        input,
        output,
      ];
      const diffLines = spawnSync('git', args).output.toString().split(/\r?\n/);
      const diff = diffLines.reduce((diff, line, lineNumber) => {
        // remove all this junk
        // ,diff --git a/transforms/v3-to-v4/__testfixtures__/typescript/rename-text-to-typography.input.tsx b/transforms/v3-to-v4/__testfixtures__/typescript/rename-text-to-typography.output.tsx
        // index 2bd814210..216d8b622 100644
        // --- a/transforms/v3-to-v4/__testfixtures__/typescript/rename-text-to-typography.input.tsx
        // +++ b/transforms/v3-to-v4/__testfixtures__/typescript/rename-text-to-typography.output.tsx
        // @@ -1,17 +1,17 @@
        if (lineNumber > 4) {
          return `${diff ? `${diff}\n` : ''}${line}`;
        }

        return diff;
      }, '');

      return `#### Changes

\`\`\`diff
${diff}
\`\`\`

${helpText}`;
    }
  }

  return helpText;
};

const README = 'README.md';
const DOCS_TOKEN = '<!-- docs -->';

const contents = readFileSync(README, 'utf8');
const prefix = contents.substring(
  0,
  contents.indexOf(DOCS_TOKEN) + DOCS_TOKEN.length + 1
);

const updated = `${prefix}
## Usage

${getHelpText()}

### Transformations

${transforms
  .map((fileName) => {
    const transform = fileName.replace(/\.(j|t)s$/, '');

    return `### \`${transform}\`

${getHelpText(transform)}
`;
  })
  .join('\n\n')}`;

writeFileSync(README, updated, 'utf8');
