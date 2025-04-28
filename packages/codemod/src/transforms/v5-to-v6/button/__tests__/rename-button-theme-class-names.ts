import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(
    import.meta.url,
    "rename-button-theme-class-names",
    null,
    fixture,
    {
      parser: "tsx",
    }
  );
};

test("button-theme-class-names");
