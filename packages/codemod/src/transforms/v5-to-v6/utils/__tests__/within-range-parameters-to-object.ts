import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(
    import.meta.url,
    "within-range-parameters-to-object",
    null,
    fixture,
    {
      parser: "ts",
    }
  );
};

test("withinRange");
