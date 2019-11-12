import fs from "fs-extra";
import log from "loglevel";
import path from "path";

import {
  documentaionReadmes,
  packagesRoot,
  projectRoot,
  documentationRoot,
  src,
} from "./paths";
import { format, glob, time } from "./utils";

const START_TOKEN = "<!-- DOCS_REMOVE -->";
const STOP_TOKEN = "<!-- DOCS_REMOVE_END -->";

async function copy(readme: string): Promise<string> {
  const pkgName = readme.substring(0, readme.indexOf("/"));

  const src = path.join(packagesRoot, readme);
  const dest = path.join(documentaionReadmes, `${pkgName}.md`);
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

const transforms = [removeDocSpecific, decreaseHeadingSize];

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

  await fs.ensureDir(documentaionReadmes);
  const moved = await Promise.all(readmes.map(copy));
  log.info();
  await Promise.all(moved.map(update));
  await fs.copy(
    path.join(projectRoot, ".github", "CONTRIBUTING.md"),
    path.join(documentationRoot, src, "guides", "contributing.md")
  );
}

export default async function copyReadmes(): Promise<void> {
  time(() => run(), "readmes");
}
