import { copy, ensureDir, readFile, writeFile } from "fs-extra";
import log from "loglevel";
import { join } from "path";

import { documentationRoot, packagesRoot, projectRoot, src } from "./constants";
import format from "./utils/format";
import glob from "./utils/glob";

const START_TOKEN = "<!-- DOCS_REMOVE -->";
const STOP_TOKEN = "<!-- DOCS_REMOVE_END -->";

const documentaionReadmes = join(documentationRoot, src, "readmes");

async function copyReadmes(readme: string): Promise<string> {
  const pkgName = readme.substring(0, readme.indexOf("/"));

  const src = join(packagesRoot, readme);
  const dest = join(documentaionReadmes, `${pkgName}.md`);
  const i = projectRoot.length + 1;

  log.debug(`- ${src.substring(i)} -> ${dest.substring(i)}`);
  await copy(src, dest);
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
  const markdown = await readFile(readme, "utf8");
  const updated = format(transform(markdown, readme), "markdown");
  await writeFile(readme, updated, "utf8");
}

export default async function readmes(): Promise<void> {
  log.info("Finding and copying readmes...");
  const readmes = await glob("!(dev-utils|documentation|react-md)/README.md", {
    cwd: packagesRoot,
  });

  await ensureDir(documentaionReadmes);
  const moved = await Promise.all(readmes.map(copyReadmes));
  log.info();
  await Promise.all(moved.map(update));
  await copy(
    join(projectRoot, ".github", "CONTRIBUTING.md"),
    join(documentationRoot, src, "guides", "contributing.md")
  );
}
