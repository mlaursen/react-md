import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "update-resize-listener", null, fixture, {
    parser: "tsx",
  });
};

test("useResizeListener");
test("SimpleResizeListenerComponent");
test("ResizeListenerMultipleReturns");
