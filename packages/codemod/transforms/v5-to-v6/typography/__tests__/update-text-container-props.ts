import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "update-text-container-props", null, fixture, {
    parser: "tsx",
  });
};

test("TextContainer");
