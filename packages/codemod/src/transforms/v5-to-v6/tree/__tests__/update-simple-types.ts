import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "update-simple-types", null, fixture, {
    parser: "tsx",
  });
};

test("SimpleTypes");
