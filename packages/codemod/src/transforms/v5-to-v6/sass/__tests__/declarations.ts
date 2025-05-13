import { defineSassTest } from "../../../../sass-test-utils.js";
import { declarations } from "../declarations.js";

const test = (fixture: string): void => {
  defineSassTest({
    transform: declarations,
    transformName: "declarations",
    importMetaUrl: import.meta.url,
    testFilePrefix: fixture,
  });
};

test("FileDropzoneColors");
test("StickyColumnsPart4.function");
test("everything-example");
test("OverridingTypography");
