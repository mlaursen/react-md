import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "update-resize-listener", null, fixture, {
    parser: "tsx",
  });
};

test("useResizeListener");
// test("SimpleResizeListenerComponent");
