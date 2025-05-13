import { defineSassTest } from "../../../../sass-test-utils.js";
import { dependencies } from "../dependencies.js";

const test = (fixture: string): void => {
  defineSassTest({
    transform: dependencies,
    transformName: "dependencies",
    importMetaUrl: import.meta.url,
    testFilePrefix: fixture,
  });
};

test("everything-deps");
test("deps-no-change");
test("deps-already-migrated");
