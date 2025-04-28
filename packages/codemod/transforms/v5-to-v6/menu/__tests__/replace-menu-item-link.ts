import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "replace-menu-item-link", null, fixture, {
    parser: "tsx",
  });
};

test("SimpleMenuItemLink");
