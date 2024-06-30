import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "caption-to-typography", null, fixture, {
    parser: "tsx",
  });
};

test("SimpleCaption");
test("CaptionWithTypography");
