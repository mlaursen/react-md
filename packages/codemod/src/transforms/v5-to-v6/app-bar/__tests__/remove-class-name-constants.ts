import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "remove-class-name-constants", null, fixture, {
    parser: "tsx",
  });
};

test("class-name-constants");
test("aliased-class-name-constants");
