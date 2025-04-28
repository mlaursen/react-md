import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "replace-menu-item-link", null, fixture, {
    parser: "tsx",
  });
};

test("SimpleMenuItemLink");
