import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "update-tabs-api", null, fixture, {
    parser: "tsx",
  });
};

test("SimpleTabExample");
test("TwoPageTabExample");
test("PersistentTabs");
test("ConfigurableTabs");
