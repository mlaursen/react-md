import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "update-badge", null, fixture, {
    parser: "tsx",
  });
};

test("BadgeKnownTheme");
test("BadgeUnknownTheme");
test("BadgedButton");
test("BadgedButtonUnknownTheme");
