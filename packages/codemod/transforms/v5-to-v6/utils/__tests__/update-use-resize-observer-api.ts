import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "update-use-resize-observer-api", null, fixture, {
    parser: "tsx",
  });
};

test("ResizeObserverExample");
test("ResizeObserverInlineExample");
test("ResizeObserverInlineAllExample");
test("ResizeObserverNewDeclarations");
test("ResizeObserverRef");
test("ResizeObserverRefUnknown");
