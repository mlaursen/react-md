import { describe, expect, it } from "@jest/globals";
import { applyTransform, defineTest } from "jscodeshift/src/testUtils";
import transform from "../hardcode-scss-variables";

const test = (fixture: string): void => {
  defineTest(__dirname, "hardcode-scss-variables", null, fixture, {
    parser: "tsx",
  });
};

test("simple-scss-variables");

describe("hardcode-scss-variables", () => {
  it("should not support computed keys", () => {
    const source = `import scssVariables from "@react-md/alert/dist/scssVariables";

const name = "rmd-snackbar-margin";
const margin = scssVariables[name];
`;

    expect(() => applyTransform(transform, null, { source })).toThrow(
      "hardcode-scss-variables does not support computed keys"
    );
  });
});
