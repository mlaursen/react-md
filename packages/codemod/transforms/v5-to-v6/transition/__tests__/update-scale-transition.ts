import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "update-scale-transition", null, fixture, {
    parser: "tsx",
  });
};

test("ScaleTransition");
test("ScaleTransitionPortalInto");
test("ScaleTransitionPortalIntoId");
