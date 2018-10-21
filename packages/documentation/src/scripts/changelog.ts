import * as fs from "fs-extra";
import * as path from "path";
import * as cpx from "cpx";
import * as toc from "markdown-toc";

import { TEMP_CHANGELOG_FOLDER, DOCUMENTATION_COMPONENTS_FOLDER } from "./constants";
import { toPascalCase } from "./utils";

const CHANGELOG_INDEX_FILE = `import Changelog from "./Changelog";

export default Changelog;
`;

const CHANGELOG_COMPONENT_FILE = `import * as React from "react";

import Changelog from "components/Changelog";

const changelog = require("./CHANGELOG.md");

export default () => <Changelog changelog={changelog} />;
`;

async function moveReadmes() {
  await fs.remove(TEMP_CHANGELOG_FOLDER);
  await fs.ensureDir(TEMP_CHANGELOG_FOLDER);

  return new Promise((resolve, reject) => {
    cpx.copy("../*/CHANGELOG.md", TEMP_CHANGELOG_FOLDER, error => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

function getPackagesWithChangelogs(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(TEMP_CHANGELOG_FOLDER, (err, folders) => {
      if (err) {
        reject(err);
      } else {
        resolve(folders);
      }
    });
  });
}

async function createIfMissing(pathName: string, contents: string) {
  if (!(await fs.pathExists(pathName))) {
    return fs.writeFile(pathName, contents);
  }

  return Promise.resolve();
}

async function createOrUpdateChangelog(packageName: string, changelogFolder: string) {
  const changelogPath = path.join(changelogFolder, "CHANGELOG.md");

  const originalChangelog = await fs.readFile(
    path.join(TEMP_CHANGELOG_FOLDER, packageName, "CHANGELOG.md"),
    "utf-8"
  );
  const tableOfContents = toc(originalChangelog).content;

  return fs.writeFile(
    path.join(changelogFolder, "CHANGELOG.md"),
    `## Table of Contents
${tableOfContents}${
      originalChangelog.length
        ? `

${originalChangelog}`
        : ""
    }
`
  );
}

export default async function changelog(clean: boolean) {
  await moveReadmes();
  const packages = await getPackagesWithChangelogs();

  Promise.all(
    packages.map(async packageName => {
      const changelogFolder = path.join(
        DOCUMENTATION_COMPONENTS_FOLDER,
        "packages",
        toPascalCase(packageName),
        "Changelog"
      );
      const changelogIndex = path.join(changelogFolder, "index.ts");
      const changelogComponent = path.join(changelogFolder, "Changelog.tsx");

      await fs.ensureDir(changelogFolder);
      await Promise.all([
        createIfMissing(changelogIndex, CHANGELOG_INDEX_FILE),
        createIfMissing(changelogComponent, CHANGELOG_COMPONENT_FILE),
        createOrUpdateChangelog(packageName, changelogFolder),
      ]);

      if (clean) {
        await fs.remove(TEMP_CHANGELOG_FOLDER);
      }
    })
  );
}
