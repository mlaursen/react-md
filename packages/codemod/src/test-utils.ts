// This is a mini port of:
// https://github.com/facebook/jscodeshift/blob/b07b6c9c46a3198d13b21a004a06409e8c347fc3/src/testUtils.js#L123
// to be used for testing with ESM only
import { describe, expect, it } from "@jest/globals";
import jscodeshift, {
  type Options,
  type Parser,
  type Transform,
} from "jscodeshift";
import { type TestOptions } from "jscodeshift/src/testUtils.js";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

interface TransformModule {
  default: Transform;
  parser?: TestOptions["parser"];
}

function getExtension(parser?: string | Parser): string {
  if (parser === "ts" || parser === "tsx") {
    return parser;
  }

  return "js";
}

export async function applyTransform(
  transformer: TransformModule | Transform,
  options: Options | null | undefined,
  input: Parameters<Transform>[0],
  testOptions?: TestOptions
): Promise<string> {
  const parser =
    testOptions?.parser ??
    (("parser" in transformer && transformer.parser) || "tsx");
  const transform =
    typeof transformer === "function" ? transformer : transformer.default;
  const j = jscodeshift.withParser(parser);
  const output = await Promise.resolve(
    transform(
      input,
      {
        jscodeshift: j,
        j: jscodeshift,
        stats: () => {},
        report: () => {},
      },
      options || {}
    )
  );

  return (output || "").trim();
}

export function defineTest(
  importMetaUrl: string,
  transformName: string,
  options?: Options | null,
  testFilePrefix = "",
  testOptions?: TestOptions
): void {
  const suffix = testFilePrefix ? `using "${testFilePrefix}" data` : "";
  const testName = "transforms correctly " + suffix;
  const dirName = dirname(fileURLToPath(importMetaUrl));

  describe(transformName, () => {
    it(testName, async () => {
      const transformer: TransformModule = await import(
        join(dirName, "..", transformName)
      );
      const parser = testOptions?.parser ?? transformer.parser ?? "tsx";
      const extension = getExtension(parser);

      const fixtureDir = join(dirName, "..", "__testfixtures__");
      const inputPath = join(
        fixtureDir,
        testFilePrefix + `.input.${extension}`
      );
      const outputPath = inputPath.replace(".input.", ".output.");

      const source = await readFile(inputPath, "utf8");
      const expected = await readFile(outputPath, "utf8");

      const output = await applyTransform(
        transformer,
        options,
        { source, path: inputPath },
        testOptions
      );

      expect(output).toEqual(expected.trim());
    });
  });
}
