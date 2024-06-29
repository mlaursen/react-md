import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "update-card-title-props", null, fixture, {
    parser: "tsx",
  });
};

test("SimpleCardTitle");
test("CardTitleDynamicSmallProp");
test("CardTitleDynamicNoWrapProp");
test("CardTitleDynamicProps");
