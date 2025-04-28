import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "remove-scroll-listener", null, fixture, {
    parser: "tsx",
  });
};

test("ScrollListenerDocsExample");
