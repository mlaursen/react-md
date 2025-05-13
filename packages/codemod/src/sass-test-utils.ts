import { describe, expect, it } from "@jest/globals";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import postcssScss from "postcss-scss";

import { type SassTransformer } from "./utils/types.js";

export function applySassTransform(
  code: string,
  transformer: SassTransformer
): string {
  const root = postcssScss.parse(code);
  const changed = transformer(root);
  if (!changed) {
    return code;
  }

  return root.toString(postcssScss.stringify);
}

interface ExpectTestFixtureOptions {
  transform: SassTransformer;
  importMetaUrl: string;
  testFilePrefix?: string;
}

export async function expectTextFixture(
  options: ExpectTestFixtureOptions
): Promise<void> {
  const { transform, importMetaUrl, testFilePrefix = "" } = options;

  const dirName = dirname(fileURLToPath(importMetaUrl));
  const fixtureDir = join(dirName, "..", "__testfixtures__");
  const inputPath = join(fixtureDir, testFilePrefix + ".input.scss");
  const outputPath = inputPath.replace(".input.", ".output.");

  const source = await readFile(inputPath, "utf8");
  const expected = await readFile(outputPath, "utf8");
  const output = applySassTransform(source, transform);
  expect(output).toEqual(expected);
}

export interface DefineSassTestOptions extends ExpectTestFixtureOptions {
  transformName: string;
}

export function defineSassTest(options: DefineSassTestOptions): void {
  const { transformName, testFilePrefix = "" } = options;
  const suffix = testFilePrefix ? `using "${testFilePrefix}" data` : "";
  const testName = "transforms correctly " + suffix;

  describe(transformName, () => {
    it(testName, async () => {
      await expectTextFixture(options);
    });
  });
}
