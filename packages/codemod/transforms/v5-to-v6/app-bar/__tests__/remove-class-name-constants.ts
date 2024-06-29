import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "remove-class-name-constants", null, fixture, {
    parser: "tsx",
  });
};

test("class-name-constants");
test("aliased-class-name-constants");
