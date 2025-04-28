import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "update-app-bar-title-props", null, fixture, {
    parser: "tsx",
  });
};

test("app-bar-title-props");
