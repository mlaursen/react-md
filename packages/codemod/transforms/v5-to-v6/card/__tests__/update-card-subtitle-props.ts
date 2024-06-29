import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "update-card-subtitle-props", null, fixture, {
    parser: "tsx",
  });
};

test("CardSubtitle");
