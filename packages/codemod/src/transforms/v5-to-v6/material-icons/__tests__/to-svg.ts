import { defineTest } from "../../../../test-utils.js";

defineTest(import.meta.url, "to-svg", null, "svg-icons", {
  parser: "tsx",
});

defineTest(import.meta.url, "to-svg", null, "renamed-svg-icons", {
  parser: "tsx",
});

// TODO
// defineTest(import.meta.url, "to-svg", null, "material-symbol-only", {
//   parser: "tsx",
// });
