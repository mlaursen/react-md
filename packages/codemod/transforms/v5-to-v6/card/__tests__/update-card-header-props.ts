import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "update-card-header-props", null, fixture, {
    parser: "tsx",
  });
};

test("CardHeader");
