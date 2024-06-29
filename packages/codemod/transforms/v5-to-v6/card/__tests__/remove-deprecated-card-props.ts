import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "remove-deprecated-card-props", null, fixture, {
    parser: "tsx",
  });
};

test("SimpleCard");
