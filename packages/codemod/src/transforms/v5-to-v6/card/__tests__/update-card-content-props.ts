import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "update-card-content-props", null, fixture, {
    parser: "tsx",
  });
};

test("CardContent");
