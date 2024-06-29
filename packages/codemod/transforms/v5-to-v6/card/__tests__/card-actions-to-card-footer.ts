import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "card-actions-to-card-footer", null, fixture, {
    parser: "tsx",
  });
};

test("CardActions");
