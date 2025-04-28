import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "to-core-imports", null, fixture, {
    parser: "tsx",
  });
};

test("simple-react-md-to-core");
test("react-md-to-core-with-types");
