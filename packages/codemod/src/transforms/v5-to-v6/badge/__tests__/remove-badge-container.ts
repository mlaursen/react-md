import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "remove-badge-container", null, fixture, {
    parser: "tsx",
  });
};

test("BadgeContainer");
