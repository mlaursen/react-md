import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(
    import.meta.url,
    "replace-nav-and-action-with-button",
    null,
    fixture,
    {
      parser: "tsx",
    }
  );
};

test("simple-usage");
