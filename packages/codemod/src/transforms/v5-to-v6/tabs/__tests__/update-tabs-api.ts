import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "update-tabs-api", null, fixture, {
    parser: "tsx",
  });
};

test("SimpleTabExample");
test("TwoPageTabExample");
test("PersistentTabs");
test("ConfigurableTabs");
