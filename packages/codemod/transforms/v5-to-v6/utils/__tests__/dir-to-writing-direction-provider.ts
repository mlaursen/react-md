import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "dir-to-writing-direction-provider", null, fixture, {
    parser: "tsx",
  });
};

test("DirToWritingDirectionProvider");
