import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "update-select-api", null, fixture, {
    parser: "tsx",
  });
};

test("SimpleSelect");
test("SelectWithDestructuredRenamedOptions");
