import { defineTest } from "jscodeshift/src/testUtils";

defineTest(__dirname, "to-svg", null, "svg-icons", {
  parser: "tsx",
});

defineTest(__dirname, "to-svg", null, "renamed-svg-icons", {
  parser: "tsx",
});

// TODO
// defineTest(__dirname, "to-svg", null, "material-symbol-only", {
//   parser: "tsx",
// });
