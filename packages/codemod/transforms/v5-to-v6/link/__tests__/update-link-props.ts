import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "update-link-props", null, fixture, {
    parser: "tsx",
  });
};

test("Link");
test("LinkComponent");
