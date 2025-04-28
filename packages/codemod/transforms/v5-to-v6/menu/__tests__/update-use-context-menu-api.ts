import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "update-use-context-menu-api", null, fixture, {
    parser: "tsx",
  });
};

test("SimpleContextMenu");
test("ComplexContextMenu");
