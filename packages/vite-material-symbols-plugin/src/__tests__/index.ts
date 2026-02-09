import {
  type MaterialSymbolsUrlOptions,
  getMaterialSymbolsUrl,
} from "@react-md/core/icon/getMaterialSymbolsUrl";
import { type MaterialSymbolName } from "@react-md/core/icon/material";
import { DEFAULT_MATERIAL_SYMBOL_NAMES } from "@react-md/core/icon/symbols";
import react from "@vitejs/plugin-react-swc";
import { readFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { build } from "vite";
import { afterEach, describe, expect, it } from "vitest";

import { materialSymbolsPlugin } from "../index.js";
import { type MaterialSymbolPluginOptions } from "../types.js";

const testFixturesPath = join(process.cwd(), "fixtures");
const simpleAppPath = join(testFixturesPath, "simple");
const simpleAppDist = join(simpleAppPath, "dist");
const withIconsAppPath = join(testFixturesPath, "with-icons");
const withIconsAppDist = join(withIconsAppPath, "dist");
const nothingAppPath = join(testFixturesPath, "nothing");
const nothingAppDist = join(nothingAppPath, "dist");

async function run({
  type = "simple",
  ...options
}: MaterialSymbolPluginOptions & {
  type?: "simple" | "with-icons" | "nothing";
} = {}) {
  const root = join(testFixturesPath, type);
  const outDir = join(root, "dist");

  await build({
    root,
    plugins: [react(), materialSymbolsPlugin(options)],
    build: {
      outDir,
    },
    logLevel: "silent",
  });

  return readFileSync(join(outDir, "index.html"), "utf8");
}

const getHref = (options?: MaterialSymbolsUrlOptions): string =>
  getMaterialSymbolsUrl(options).replace("&", "&amp;");

describe("@react-md/vite-material-symbols-plugin", () => {
  afterEach(() => {
    rmSync(simpleAppDist, { force: true, recursive: true });
    rmSync(withIconsAppDist, { force: true, recursive: true });
    rmSync(nothingAppDist, { force: true, recursive: true });
  });

  it("should be able to add links to the html", async () => {
    const html = await run();
    expect(html).toContain(
      '<link rel="preconnect" href="https://fonts.googleapis.com">'
    );
    expect(html).toContain(
      '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">'
    );
    expect(html).toContain(`<link rel="stylesheet" href="${getHref()}">`);
  });

  it("should allow the preconnect links to be disabled", async () => {
    const html = await run({ disablePreconnectLinks: true });

    expect(html).not.toContain(
      '<link rel="preconnect" href="https://fonts.googleapis.com">'
    );
    expect(html).not.toContain(
      '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">'
    );
    expect(html).toContain(`<link rel="stylesheet" href="${getHref()}">`);
  });

  it("should allow for custom default icons", async () => {
    const html = await run({ defaultSymbolNames: ["favorite"] });

    expect(html).toContain(
      `<link rel="stylesheet" href="${getHref({ names: ["favorite"] })}">`
    );
  });

  it("should be able to find MaterialSymbol names in code", async () => {
    const html = await run({ type: "with-icons" });
    const names = [
      ...DEFAULT_MATERIAL_SYMBOL_NAMES,
      "favorite",
      "10k",
      "search",
    ] satisfies MaterialSymbolName[];
    expect(html).toContain(
      `<link rel="stylesheet" href="${getHref({ names })}">`
    );
  });

  it("should not add any links if no symbols were found", async () => {
    const html = await run({ type: "nothing", defaultSymbolNames: [] });
    expect(html).not.toContain(
      '<link rel="preconnect" href="https://fonts.googleapis.com">'
    );
    expect(html).not.toContain(
      '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">'
    );
    expect(html).not.toContain('<link rel="stylesheet" href="');
  });
});
