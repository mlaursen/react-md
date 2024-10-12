import { describe, expect, it } from "@jest/globals";
import { compile } from "@mdx-js/mdx";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { rehypeColorPreview } from "../rehype-color-preview.js";

async function getFixture(name: string): Promise<string> {
  const filePath = resolve(process.cwd(), "src", "__testfixtures__", name);
  return await readFile(filePath, "utf8");
}

async function processMarkdown(markdown: string) {
  return compile(markdown, {
    rehypePlugins: [rehypeColorPreview],
  });
}

describe("rehypeColorPreview", () => {
  it("should render inline color elements within paragraphs", async () => {
    const fixture = await getFixture("SimpleColorTest.md");
    const processed = await processMarkdown(fixture);
    expect(processed.value).toMatchSnapshot();
  });

  it("should render inline colors in other places", async () => {
    const fixture = await getFixture("HeadingColorTest.md");
    const processed = await processMarkdown(fixture);
    expect(processed.value).toMatchSnapshot();
  });
});
