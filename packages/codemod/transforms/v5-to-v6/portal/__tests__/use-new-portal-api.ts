import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "use-new-portal-api", null, fixture, {
    parser: "tsx",
  });
};

test("ConvertablePortal");
test("PortalWarning");
test("ConvertableConditionalPortalNoPortal");
test("ConvertableConditionalPortalPortal");
test("PortalIntoType");
