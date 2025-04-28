import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "update-card-subtitle-props", null, fixture, {
    parser: "tsx",
  });
};

test("CardSubtitle");
