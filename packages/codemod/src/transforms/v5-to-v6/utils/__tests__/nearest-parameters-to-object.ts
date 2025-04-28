import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "nearest-parameters-to-object", null, fixture, {
    parser: "ts",
  });
};

test("nearest");
