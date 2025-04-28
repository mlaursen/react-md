import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "update-password-props", null, fixture, {
    parser: "tsx",
  });
};

test("PasswordExample");
