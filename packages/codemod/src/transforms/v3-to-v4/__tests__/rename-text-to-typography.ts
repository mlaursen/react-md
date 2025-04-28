import { describe } from "@jest/globals";

import { defineTest } from "../../../test-utils.js";

const testName = "rename-text-to-typography";

["javascript", "typescript"].forEach((language) => {
  describe(`${language}`, () => {
    defineTest(import.meta.url, testName, null, `${language}/${testName}`, {
      parser: language === "typescript" ? "tsx" : "babel",
    });
  });
});
