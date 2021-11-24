import { defineTest } from "jscodeshift/src/testUtils";

const testName = "rename-text-to-typography";

["javascript", "typescript"].forEach((language) => {
  describe(language, () => {
    defineTest(__dirname, testName, null, `${language}/${testName}`, {
      parser: language === "typescript" ? "tsx" : "babel",
    });
  });
});
