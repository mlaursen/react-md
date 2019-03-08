import fs from "fs-extra";
import path from "path";
import { documentationRoot, packagesRoot, projectRoot } from "./paths";
import { glob, log, time, format } from "./utils";

export default async function copyReadmes() {
  time(() => run(), "readmes");
}

const docPackages = path.join(documentationRoot, "pages", "packages");

const INCLUDING_STYLES = "<!-- INCLUDING_STYLES -->";
const START_TOKEN = "<!-- DOCS_REMOVE -->";
const STOP_TOKEN = "<!-- DOCS_REMOVE_END -->";

async function copy(readme: string) {
  const pkgName = readme.substring(0, readme.indexOf("/"));
  const dir = path.join(docPackages, pkgName);
  await fs.ensureDir(dir);

  const src = path.join(packagesRoot, readme);
  const dest = path.join(dir, "README.md");
  const i = projectRoot.length + 1;

  log(`- ${src.substring(i)} -> ${dest.substring(i)}`);
  await fs.copy(src, dest);
  return dest;
}

function removeDocSpecific(markdown: string, fileName: string) {
  const startIndex = markdown.indexOf(START_TOKEN);
  const stopIndex = markdown.indexOf(STOP_TOKEN) + STOP_TOKEN.length + 1;

  if (startIndex === -1) {
    return markdown;
  } else if (stopIndex < startIndex) {
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

function decreaseHeadingSize(markdown: string) {
  return markdown.replace(/(#+)(?= )/g, "$1#");
}

function addIncludingStylesLink(markdown: string) {
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

const transform = (markdown: string, readme: string) =>
  transforms.reduce((updated, fn) => fn(updated, readme), markdown);

async function update(readme: string) {
  const markdown = await fs.readFile(readme, "utf8");
  const updated = await format(transform(markdown, readme), readme, "markdown");
  await fs.writeFile(readme, updated, "utf8");
}

async function run() {
  log("Finding and copying readmes...");
  const readmes = await glob(
    "!(dev-utils|documentation|react-md|forms)/README.md",
    {
      cwd: packagesRoot,
    }
  );

  const moved = await Promise.all(readmes.map(copy));
  log();
  await Promise.all(moved.map(update));
}
