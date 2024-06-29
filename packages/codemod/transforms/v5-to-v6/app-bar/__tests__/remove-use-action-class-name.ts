import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "remove-use-action-class-name", null, fixture, {
    parser: "tsx",
  });
};

test("ActionMenu");
test("GithubLink");
test("NavHeaderTitle");
test("use-action-class-name-all");
