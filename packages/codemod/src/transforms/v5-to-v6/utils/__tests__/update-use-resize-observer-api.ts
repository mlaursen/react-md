import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "update-use-resize-observer-api", null, fixture, {
    parser: "tsx",
  });
};

test("ResizeObserverExample");
test("ResizeObserverInlineExample");
test("ResizeObserverInlineAllExample");
test("ResizeObserverNewDeclarations");
test("ResizeObserverRef");
test("ResizeObserverRefUnknown");
