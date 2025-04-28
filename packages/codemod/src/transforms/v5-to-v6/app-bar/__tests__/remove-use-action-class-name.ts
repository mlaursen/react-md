import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "remove-use-action-class-name", null, fixture, {
    parser: "tsx",
  });
};

test("ActionMenu");
test("GithubLink");
test("NavHeaderTitle");
test("use-action-class-name-all");
