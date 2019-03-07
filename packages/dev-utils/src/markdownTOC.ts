import fs from "fs-extra";
import toc from "markdown-toc";
import { glob, log, time, list, format } from "./utils";

export default async function markdownTOC(globString: string) {
  time(() => doWork(globString), "toc");
}

const START_TOKEN = "<!-- toc -->";
const STOP_TOKEN = "<!-- tocstop -->";

async function doWork(globString: string) {
  log("Searching for markdown pages using:");
  log(` - "${globString}"`);
  log();
  const files = await glob(globString);

  log("Found the following markdown files:");
  log(list(files));
  log();

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

    log(`Updating "${filePath}" to include a table of contents...`);
    log();
    const { content } = toc(markdown, {
      filter: s => !s.includes("Table of Contents"),
    });
    log(content);

    const updated = await format(
      `${start > 0 ? markdown.substring(0, start) : ""}${START_TOKEN}
## Table of Contents
${content}

${STOP_TOKEN}

${markdown.substring(end + STOP_TOKEN.length)}
`,
      filePath,
      "markdown"
    );

    await fs.writeFile(filePath, updated);
  });
}
