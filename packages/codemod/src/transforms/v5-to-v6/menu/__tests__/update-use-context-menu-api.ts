import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "update-use-context-menu-api", null, fixture, {
    parser: "tsx",
  });
};

test("SimpleContextMenu");
test("ComplexContextMenu");
