const { execSync } = require('child_process');
const { writeFile } = require('fs');

const commitSha = execSync('git rev-parse HEAD').toString().trim();
const { version } = require('../../lerna.json');
const gaCode = process.env.GA_CODE || 'UA-76079335-2';

const contents = `NEXT_PUBLIC_GA_CODE=${gaCode}
NEXT_PUBLIC_COMMIT_SHA=${commitSha}
NEXT_PUBLIC_RMD_VERSION=${version}
`;

writeFile('.env.production.local', contents, (error) => {
  if (error) {
    throw error;
  }

  console.log(contents);
});
