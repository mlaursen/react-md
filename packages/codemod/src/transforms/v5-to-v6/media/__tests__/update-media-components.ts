import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "update-media-components", null, fixture, {
    parser: "tsx",
  });
};

test("SimpleMediaExample");
test("ForcedAspectRatio");
test("WithOverlay");
