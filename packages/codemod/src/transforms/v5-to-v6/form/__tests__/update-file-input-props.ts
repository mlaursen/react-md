import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "update-file-input-props", null, fixture, {
    parser: "tsx",
  });
};

test("SimpleFileInput");
