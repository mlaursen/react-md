import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "nearest-parameters-to-object", null, fixture, {
    parser: "ts",
  });
};

test("nearest");
