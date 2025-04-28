import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "update-link-props", null, fixture, {
    parser: "tsx",
  });
};

test("Link");
test("LinkComponent");
