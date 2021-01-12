import filesize from "filesize";
import { readFileSync, writeFileSync } from "fs";
import gzipSize from "gzip-size";
import log from "loglevel";
import { join } from "path";

import { documentationRoot, packagesRoot, projectRoot, src } from "./constants";
import { shared } from "./shared";
import { themes } from "./themes";
import { umd as createUmd } from "./umd";
import { format, git, glob, list, uncommittedFiles } from "./utils";

const cwd = join(packagesRoot, "react-md");
const SIZE_REGEXP = /^ - .+$/gm;
const LIBSIZE_TOKEN = "yarn dev-utils libsize\n\n";
const ROOT_README_PATH = join(projectRoot, "README.md");
const ABOUT_README_PATH = join(
  documentationRoot,
  src,
  "components",
  "About",
  "README.md"
);

interface Options {
  umd?: boolean;
  forceUmd?: boolean;
  themes?: boolean;
  forceThemes?: boolean;
  stageChanges?: boolean;
}

async function umdSizes(force: boolean): Promise<readonly string[]> {
  let umd = await glob("dist/umd/*.min.js", { cwd });
  if (force || !umd.length) {
    await createUmd();
    umd = await glob("dist/umd/*.min.js", { cwd });
  }

  // want base lib first
  umd.sort((a, b) => {
    if (!a.includes("icon")) {
      return -1;
    }

    if (!b.includes("icon")) {
      return 1;
    }

    return a.localeCompare(b);
  });

  return umd.map(
    (name) =>
      `${name} ${filesize(
        gzipSize.sync(readFileSync(join(cwd, name), "utf8"))
      )}`
  );
}

async function cssSize(force: boolean): Promise<readonly string[]> {
  if (force) {
    await themes();
  }

  const css = await glob("themes/*.min.css", { cwd: projectRoot });

  const { min, max } = css.reduce(
    (result, cssPath) => {
      const size = gzipSize.sync(
        readFileSync(join(projectRoot, cssPath), "utf8")
      );
      const update = { name: cssPath, size };
      if (size > result.max.size) {
        result.max = update;
      }

      if (result.min.size === -1 || size < result.min.size) {
        result.min = update;
      }

      return result;
    },
    {
      min: { name: "", size: -1 },
      max: { name: "", size: 0 },
    }
  );

  return [
    `${min.name} ${filesize(min.size)}`,
    `${max.name} ${filesize(max.size)}`,
  ];
}

function getPreviousLibsize(filePath: string): string {
  const readme = readFileSync(filePath, "utf8");
  const startIndex = readme.indexOf(LIBSIZE_TOKEN);
  if (startIndex === -1) {
    throw new Error(`Unable to find \`${LIBSIZE_TOKEN}\` in \`${filePath}\``);
  }
  const content = readme.substring(startIndex);
  const contentEndIndex = content.indexOf("```");
  return content.substring(0, contentEndIndex);
}

interface Size {
  size: number;
  unit: string;
}

function getSizes(message: string): readonly Size[] {
  const sizes = message.match(SIZE_REGEXP);
  if (!sizes) {
    log.error("No sizes found...");
    process.exit(1);
  }

  return sizes.map((line) => {
    const [unit, size] = line.split(" ").reverse();

    return {
      size: parseFloat(size),
      unit,
    };
  });
}

function logPercentChanged(message: string, umd: boolean, css: boolean): void {
  const previous = getSizes(getPreviousLibsize(ROOT_README_PATH));
  const current = getSizes(message);
  const start = umd ? 0 : 3;
  const end = previous.length - (css ? 0 : 2);

  let i = 0;
  const updated = message
    .split(/\r?\n/)
    .map((line) => {
      if (!line.startsWith(" - ") || i > end) {
        return line;
      }

      if (i < start) {
        i += 1;
        return line;
      }

      const prevSize = previous[i].size;
      const currSize = current[i].size;
      const changedKB = (currSize - prevSize) * 100;
      const token = `${currSize} ${current[i].unit}`;
      const sign = changedKB > 0 ? "+" : "-";
      const change = `${sign} ${filesize(Math.abs(changedKB))}`;
      i += 1;

      if (changedKB !== 0) {
        return line.replace(token, `${token} (${change})`);
      }

      return line;
    })
    .join("\n");

  log.info(updated);
}

function updateLibsize(filePath: string, message: string): void {
  const readme = readFileSync(filePath, "utf8");
  const startIndex = readme.indexOf(LIBSIZE_TOKEN);
  if (startIndex === -1) {
    throw new Error(`Unable to find \`${LIBSIZE_TOKEN}\` in \`${filePath}\``);
  }
  const prefix = readme.substring(0, startIndex);
  const content = readme.substring(startIndex + 1);
  const contentEndIndex = content.indexOf("```");
  const suffix = content.substring(contentEndIndex);

  const updated = `${prefix}${message}${suffix}`;

  writeFileSync(filePath, updated);
}

const getSize = (size: string): string =>
  size.split(" ").reverse().slice(0, 2).reverse().join(" ");

function updateOtherPros(umd: string[], css: string[]): void {
  const umdSize = getSize(umd[0]);
  const minCssSize = getSize(css[0]);
  const maxCssSize = getSize(css[1]);
  const filePath = join(
    documentationRoot,
    src,
    "components",
    "Home",
    "LibraryInfo",
    "OtherPros.tsx"
  );

  const content = `/* this file is automatically updated by \`yarn dev-utils libsize\` and should not be updated manually */
import React, { ReactElement } from "react";

import TableCellList from "./TableCellList";

export default function OtherPros(): ReactElement {
  return (
    <TableCellList>
      <li>
        A fairly small library size (gzipped):
        <ul>
          <li>
            Production UMD Bundle:
            <br />
            <b>${umdSize}</b>
          </li>
          <li>
            Default Production CSS Bundles:
            <br />
            <b>${minCssSize}</b> - <b>${maxCssSize}</b>
          </li>
        </ul>
      </li>
    </TableCellList>
  );
}
`;

  writeFileSync(filePath, format(content, "typescript"));
}

export async function libsize({
  umd = true,
  forceUmd = false,
  themes = true,
  forceThemes = false,
  stageChanges = false,
}: Options): Promise<void> {
  umd = umd || forceUmd;
  themes = themes || forceThemes;
  if (!umd && !themes) {
    log.error(
      "Both `umd` and `themes` were set to `false` so no sizes can be determined."
    );
    process.exit(1);
  }

  const css: string[] = [];
  const umds: string[] = [];
  if (umd) {
    umds.push(...(await umdSizes(forceUmd)));
  }

  if (themes) {
    css.push(...(await cssSize(forceThemes)));
  }

  let message = LIBSIZE_TOKEN;
  if (umds.length) {
    message = `${message}The gizipped UMD bundle sizes are:
${list(umds)}
`;
  }

  if (css.length) {
    const space = umds.length ? "\n" : "";
    message = `${message}${space}The min and max gzipped CSS bundle sizes are:
${list(css)}
`;
  }

  logPercentChanged(message, !!umds.length, !!css.length);

  if (stageChanges && umds.length && css.length) {
    log.info("Updating documentation files with libsize...");
    updateLibsize(ROOT_README_PATH, message);
    updateLibsize(ABOUT_README_PATH, message);
    updateOtherPros(umds, css);
    await shared();

    if (uncommittedFiles()) {
      git("add -u");
    }
  }
}
