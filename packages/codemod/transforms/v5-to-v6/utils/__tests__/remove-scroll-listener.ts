import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "remove-scroll-listener", null, fixture, {
    parser: "tsx",
  });
};

test("ScrollListenerDocsExample");
