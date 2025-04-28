import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "update-media-components", null, fixture, {
    parser: "tsx",
  });
};

test("SimpleMediaExample");
test("ForcedAspectRatio");
test("WithOverlay");
