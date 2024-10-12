import { describe, expect, it } from "@jest/globals";
import { compile } from "@mdx-js/mdx";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { rehypeKeyboardCode } from "../rehype-keyboard-code.js";

async function getFixture(name: string): Promise<string> {
  const filePath = resolve(process.cwd(), "src", "__testfixtures__", name);
  return await readFile(filePath, "utf8");
}

const processMarkdown = (markdown: string) =>
  compile(markdown, {
    rehypePlugins: [rehypeKeyboardCode],
  });

describe("rehypeKeyboardCode", () => {
  it("should be able to handle coverting keyboard code strings to kbd", async () => {
    const markdown = await getFixture("SimpleKeyboardCode.md");
    const processed = await processMarkdown(markdown);

    expect(processed.value).toMatchSnapshot();
  });

  it("should be able to handle coverting a single modifier with an action to multiple kbd", async () => {
    const markdown = await getFixture("ComplexKeyboardCode.md");
    const processed = await processMarkdown(markdown);

    expect(processed.value).toMatchSnapshot();
  });
});
