import { defineSassTest } from "../../../../sass-test-utils.js";
import { mixins } from "../mixins.js";

const test = (fixture: string): void => {
  defineSassTest({
    transform: mixins,
    transformName: "mixins",
    importMetaUrl: import.meta.url,
    testFilePrefix: fixture,
  });
};

test("example-app");
test("PanelResizer");
test("theme-color-mixins");
test("form-theme-simple");
test("update-checkbox-size");
