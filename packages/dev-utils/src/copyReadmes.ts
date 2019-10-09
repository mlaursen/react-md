import fs from "fs-extra";
import path from "path";
import log from "loglevel";

import { documentationRoot, packagesRoot, projectRoot, src } from "./paths";
import { glob, time, format } from "./utils";

const docPackages = path.join(documentationRoot, src, "pages", "packages");

const INCLUDING_STYLES = "<!-- INCLUDING_STYLES -->";
const START_TOKEN = "<!-- DOCS_REMOVE -->";
const STOP_TOKEN = "<!-- DOCS_REMOVE_END -->";

async function copy(readme: string): Promise<string> {
  const pkgName = readme.substring(0, readme.indexOf("/"));
  const dir = path.join(docPackages, pkgName);
  await fs.ensureDir(dir);

  const src = path.join(packagesRoot, readme);
  const dest = path.join(dir, "README.md");
  const i = projectRoot.length + 1;

  log.debug(`- ${src.substring(i)} -> ${dest.substring(i)}`);
  await fs.copy(src, dest);
  return dest;
}

function removeDocSpecific(markdown: string, fileName: string): string {
  const startIndex = markdown.indexOf(START_TOKEN);
  const stopIndex = markdown.indexOf(STOP_TOKEN) + STOP_TOKEN.length + 1;

  if (startIndex === -1) {
    return markdown;
  }
  if (stopIndex < startIndex) {
    /* eslint-disable no-console */
    console.error(`Attempted to remove documentation specific markdown, but the required end tag was not found.
Tag: "${startIndex === -1 ? START_TOKEN : STOP_TOKEN}"
File: "${fileName}"
`);
    console.error();
    process.exit(1);
  }

  return removeDocSpecific(
    markdown.substring(0, startIndex) + markdown.substring(stopIndex),
    fileName
  );
}

function decreaseHeadingSize(markdown: string): string {
  return markdown.replace(/(#+)(?= )/g, "$1#");
}

function addIncludingStylesLink(markdown: string): string {
  return markdown.replace(
    INCLUDING_STYLES,
    `### Including Styles

> If you have not done so already, please read the main documentation about
> #including-styles before continuing.

`
  );
}

const transforms = [
  removeDocSpecific,
  decreaseHeadingSize,
  addIncludingStylesLink,
];

const transform = (markdown: string, readme: string): string =>
  transforms.reduce((updated, fn) => fn(updated, readme), markdown);

async function update(readme: string): Promise<void> {
  const markdown = await fs.readFile(readme, "utf8");
  const updated = format(transform(markdown, readme), "markdown");
  await fs.writeFile(readme, updated, "utf8");
}

async function run(): Promise<void> {
  log.info("Finding and copying readmes...");
  const readmes = await glob("!(dev-utils|documentation|react-md)/README.md", {
    cwd: packagesRoot,
  });

  const moved = await Promise.all(readmes.map(copy));
  log.info();
  await Promise.all(moved.map(update));
}

export default async function copyReadmes(): Promise<void> {
  time(() => run(), "readmes");
}
