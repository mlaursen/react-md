import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "update-badge", null, fixture, {
    parser: "tsx",
  });
};

test("BadgeKnownTheme");
test("BadgeUnknownTheme");
test("BadgedButton");
test("BadgedButtonUnknownTheme");
