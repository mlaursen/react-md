import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "remove-removed-types", null, fixture, {
    parser: "tsx",
  });
};

test("RemovedTypes");
