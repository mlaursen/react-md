import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "update-card-content-props", null, fixture, {
    parser: "tsx",
  });
};

test("CardContent");
