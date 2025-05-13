import { defineSassTest } from "../../../../sass-test-utils.js";
import all from "../all.js";

const test = (fixture: string): void => {
  defineSassTest({
    transform: all,
    transformName: "all",
    importMetaUrl: import.meta.url,
    testFilePrefix: fixture,
  });
};

test("renderers");
test("app");
test("PrevDocsApp");
test("MarkdownEditor");
test("PlaygroundView");
