import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "update-card-title-props", null, fixture, {
    parser: "tsx",
  });
};

test("SimpleCardTitle");
test("CardTitleDynamicSmallProp");
test("CardTitleDynamicNoWrapProp");
test("CardTitleDynamicProps");
