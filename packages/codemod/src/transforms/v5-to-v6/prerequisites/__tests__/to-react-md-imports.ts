import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "to-react-md-imports", null, fixture, {
    parser: "tsx",
  });
};

test("scoped-package-imports");
test("duplicated-scoped-package-imports");
test("MultipleScopedImports");
