import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "remove-badge-container", null, fixture, {
    parser: "tsx",
  });
};

test("BadgeContainer");
