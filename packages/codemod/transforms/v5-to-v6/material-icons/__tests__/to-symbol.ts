import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "to-symbol", null, fixture, {
    parser: "tsx",
  });
};

test("material-symbols");
test("material-symbol-only");
