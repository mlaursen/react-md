import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "to-react-md-imports", null, fixture, {
    parser: "tsx",
  });
};

test("scoped-package-imports");
test("duplicated-scoped-package-imports");
