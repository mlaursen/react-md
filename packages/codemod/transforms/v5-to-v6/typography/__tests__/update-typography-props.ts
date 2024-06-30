import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "update-typography-props", null, fixture, {
    parser: "tsx",
  });
};

test("RenameTypographyComponentProp");
test("WarnTypographyClassNameRenderer1");
test("WarnTypographyClassNameRenderer2");
test("SrOnly");
test("SrOnlyWarnTypographyClassNameRenderer1");
test("SrOnlyWarnTypographyClassNameRenderer2");
