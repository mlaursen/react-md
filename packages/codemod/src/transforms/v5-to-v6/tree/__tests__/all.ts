import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "all", null, fixture, {
    parser: "tsx",
  });
};

test("CustomizingTreeItems");
