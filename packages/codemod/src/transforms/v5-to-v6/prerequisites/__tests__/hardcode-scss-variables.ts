import { describe, expect, it } from "@jest/globals";

import { applyTransform, defineTest } from "../../../../test-utils.js";
import transform from "../hardcode-scss-variables.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "hardcode-scss-variables", null, fixture, {
    parser: "tsx",
  });
};

test("simple-scss-variables");

describe("hardcode-scss-variables", () => {
  it("should not support computed keys", async () => {
    const source = `import scssVariables from "@react-md/alert/dist/scssVariables";

const name = "rmd-snackbar-margin";
const margin = scssVariables[name];
`;

    await expect(
      applyTransform(transform, null, { source, path: "src/test.ts" })
    ).rejects.toThrow("hardcode-scss-variables does not support computed keys");
  });
});
