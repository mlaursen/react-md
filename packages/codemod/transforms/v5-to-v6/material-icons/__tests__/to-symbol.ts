import { defineTest } from "jscodeshift/src/testUtils";

defineTest(__dirname, "to-symbol", null, "material-symbol-only", {
  parser: "tsx",
});
