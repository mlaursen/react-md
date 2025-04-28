import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(
    import.meta.url,
    "dir-to-writing-direction-provider",
    null,
    fixture,
    {
      parser: "tsx",
    }
  );
};

test("DirToWritingDirectionProvider");
