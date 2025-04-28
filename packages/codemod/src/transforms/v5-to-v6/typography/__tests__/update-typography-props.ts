import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "update-typography-props", null, fixture, {
    parser: "tsx",
  });
};

test("RenameTypographyComponentProp");
test("WarnTypographyClassNameRenderer1");
test("WarnTypographyClassNameRenderer2");
test("SrOnly");
test("SrOnlyWarnTypographyClassNameRenderer1");
test("SrOnlyWarnTypographyClassNameRenderer2");
