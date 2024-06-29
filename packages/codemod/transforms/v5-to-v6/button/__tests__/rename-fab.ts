import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "rename-fab", null, fixture, {
    parser: "tsx",
  });
};

test("fab");
