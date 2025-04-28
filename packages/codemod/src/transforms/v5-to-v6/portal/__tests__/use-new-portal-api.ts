import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "use-new-portal-api", null, fixture, {
    parser: "tsx",
  });
};

test("ConvertablePortal");
test("PortalWarning");
test("ConvertableConditionalPortalNoPortal");
test("ConvertableConditionalPortalPortal");
test("PortalIntoType");
