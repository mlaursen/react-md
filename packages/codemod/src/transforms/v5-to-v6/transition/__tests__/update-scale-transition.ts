import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "update-scale-transition", null, fixture, {
    parser: "tsx",
  });
};

test("ScaleTransition");
test("ScaleTransitionPortalInto");
test("ScaleTransitionPortalIntoId");
