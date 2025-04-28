import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "caption-to-typography", null, fixture, {
    parser: "tsx",
  });
};

test("SimpleCaption");
test("CaptionWithTypography");
