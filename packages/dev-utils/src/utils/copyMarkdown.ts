import { readFile } from "fs-extra";
import log from "loglevel";
import { join, sep } from "path";

import writeFile from "./writeFile";
import format from "./format";

const githubUrl = "https://github.com/mlaursen/react-md";
const masterUrl = `${githubUrl}/tree/master`;
const masterRegExp = new RegExp(masterUrl, "g");
const githubRegExp = new RegExp(githubUrl, "g");

const START_TOKEN = "<!-- DOCS_REMOVE -->";
const STOP_TOKEN = "<!-- DOCS_REMOVE_END -->";
const SEP_REGEXP = new RegExp(sep, "g");

function removeDocSpecific(markdown: string, filePath?: string): string {
  const startIndex = markdown.indexOf(START_TOKEN);
  const stopIndex = markdown.indexOf(STOP_TOKEN) + STOP_TOKEN.length + 1;

  if (startIndex === -1) {
    return markdown;
  }
  if (stopIndex < startIndex) {
    const fileInfo = filePath ? `\nFile Path: ${filePath}` : "";
    /* eslint-disable no-console */
    console.error(`Attempted to remove documentation specific markdown, but the required end tag was not found.
Tag: "${startIndex === -1 ? START_TOKEN : STOP_TOKEN}"${fileInfo}
`);
    console.error(new Error().stack);
    console.error();
    process.exit(1);
  }

  return removeDocSpecific(
    markdown.substring(0, startIndex) + markdown.substring(stopIndex)
  );
}

function updateRelativePaths(markdown: string, filePath: string): string {
  const prefix = filePath.substring(
    filePath.indexOf("react-md") + `react-md${sep}`.length,
    filePath.lastIndexOf(sep)
  );

  // ./path/to/file
  // ../../../path/to/file
  return markdown.replace(
    /]\(((\.\/|(\.\.\/)+)[A-z0-9/.-]+)\)/g,
    (_, relativePath) => {
      const githubPath = join(prefix, relativePath);

      return `]({{GITHUB_FILE_URL}}/${githubPath.replace(SEP_REGEXP, "/")})`;
    }
  );
}

const transform = (markdown: string, filePath: string): string =>
  [removeDocSpecific, updateRelativePaths].reduce(
    (updated, fn) => fn(updated, filePath),
    markdown
  );

export default async function copyMarkdown(
  src: string,
  dest: string
): Promise<void> {
  const markdown = await readFile(src, "utf8");
  const updated = transform(markdown, src)
    .replace(/(#+)(?= )/g, "$1#")
    .replace(masterRegExp, "{{GITHUB_FILE_URL}}")
    .replace(githubRegExp, "{{GITHUB_URL}}");

  log.debug(`- ${src} -> ${dest}`);
  return writeFile(dest, format(updated, "markdown"));
}
