import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "remove-removed-types", null, fixture, {
    parser: "tsx",
  });
};

test("RemovedTypes");
