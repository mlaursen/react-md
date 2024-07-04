import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "update-simple-types", null, fixture, {
    parser: "tsx",
  });
};

test("SimpleTypes");
