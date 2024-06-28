import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "to-core-imports", null, fixture, {
    parser: "tsx",
  });
};

test("simple-react-md-to-core");
test("react-md-to-core-with-types");
