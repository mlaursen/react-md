import fs from "fs-extra";
import toc from "markdown-toc";
import log from "loglevel";
import { glob, time, list, format } from "./utils";

export default async function markdownTOC(globString: string) {
  time(() => doWork(globString), "toc");
}

const START_TOKEN = "<!-- toc -->";
const STOP_TOKEN = "<!-- tocstop -->";

async function doWork(globString: string) {
  log.debug("Searching for markdown pages using:");
  log.debug(` - "${globString}"`);
  log.debug();
  const files = await glob(globString);

  log.info("Adding a table of contents to the following files:");
  log.info(list(files));
  log.info();

  const markdowns = await Promise.all(
    files.map(async filePath => {
      const markdown = await fs.readFile(filePath, "utf8");
      return { filePath, markdown };
    })
  );

  markdowns.forEach(async ({ filePath, markdown }) => {
    const start = markdown.indexOf(START_TOKEN);
    const end = markdown.indexOf(STOP_TOKEN);
    if (start === -1 && end === -1) {
      return;
    }

    if (start === -1 || end === -1) {
      console.error(
        "A markdown file does not have the required comments so a " +
          "table of contents can be generated. Update " +
          `"${filePath}" to have "<!-- toc -->" and "<!-- tocstop ->>"`
      );
      console.error();
      process.exit(1);
    }

    log.debug(`Updating "${filePath}" to include a table of contents...`);
    log.debug();
    const { content } = toc(markdown, {
      filter: s => !s.includes("Table of Contents"),
    });
    log.debug(content);

    const updated = format(
      `${start > 0 ? markdown.substring(0, start) : ""}${START_TOKEN}
## Table of Contents
${content}

${STOP_TOKEN}

${markdown.substring(end + STOP_TOKEN.length)}
`,
      "markdown"
    );

    await fs.writeFile(filePath, updated);
  });
}
