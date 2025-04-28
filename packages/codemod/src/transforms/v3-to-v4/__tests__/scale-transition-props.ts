import { describe } from "@jest/globals";

import { defineTest } from "../../../test-utils.js";

const testName = "scale-transition-props";

["javascript", "typescript"].forEach((language) => {
  describe(`${language}`, () => {
    defineTest(import.meta.url, testName, null, `${language}/${testName}`, {
      parser: language === "typescript" ? "tsx" : "babel",
    });
  });
});
