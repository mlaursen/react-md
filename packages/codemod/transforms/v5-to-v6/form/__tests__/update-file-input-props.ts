import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "update-file-input-props", null, fixture, {
    parser: "tsx",
  });
};

test("SimpleFileInput");
