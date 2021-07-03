import { readFile, writeFile } from "fs-extra";
import log from "loglevel";
import { join } from "path";

import { documentationRoot, projectRoot, src } from "../constants";
import { format } from "./format";
import { getPackageJson } from "./packages";
import { verify } from "./verify";

const NEW_ENTRY = /^#{1,2}\s+\[\d/;

async function getCurrentReleaseNotes(): Promise<string> {
  log.info("Update the root CHANGELOG.md with any additional changes.");
  if (!(await verify("Continue with the release?"))) {
    process.exit(1);
  }

  const changelog = await readFile(join(projectRoot, "CHANGELOG.md"), "utf8");
  const lines = changelog.split(/\r?\n/);
  let lastEntryStart = -1;
  let nextEntryStart = -1;

  for (let i = 0; i < lines.length; i += 1) {
    if (NEW_ENTRY.test(lines[i])) {
      if (lastEntryStart === -1) {
        lastEntryStart = i + 1;
      } else if (nextEntryStart === -1) {
        nextEntryStart = i;
        break;
      }
    }
  }

  if (lastEntryStart === -1 || nextEntryStart === -1) {
    log.error("Unable to find a release block.");
    process.exit(1);
  }

  return lines.slice(lastEntryStart, nextEntryStart).join("\n");
}

/**
 *
 * @returns the current release markdown that can be used to generate a github
 * release for the current tag.
 */
export async function initBlog(): Promise<string> {
  const blogPath = join(documentationRoot, src, "blogs", "index.md");
  const version = (await getPackageJson("react-md")).version;
  const blog = await readFile(blogPath, "utf-8");

  const currentReleaseNotes = await getCurrentReleaseNotes();
  const blogMarkdown = currentReleaseNotes
    // create smaller headings and remove margin
    .replace(/^(###)\s+(.+)$/gm, "##### $2<!-- no-margin -->")
    // replace issue/pr references with super-shorthand syntax.  they can
    // optionally be wrapped in additional parenthesis (mostly dependabot)
    .replace(/\(?\[(#\d+)]\([^)]+\)\)?/g, "$1")
    // replace all commit hashes with shorthand syntax
    .replace(/\(\[([0-9a-f]{7})]\([^)]+\)\)/gm, "($1)");

  const contents = `Title: react-md ${version}

Date: ${new Date().toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })}

Summary:

${blogMarkdown}

---

${blog}
`;

  await writeFile(blogPath, format(contents, "markdown"));

  return currentReleaseNotes;
}
