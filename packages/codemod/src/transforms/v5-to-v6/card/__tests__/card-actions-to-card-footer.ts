import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "card-actions-to-card-footer", null, fixture, {
    parser: "tsx",
  });
};

test("CardActions");
