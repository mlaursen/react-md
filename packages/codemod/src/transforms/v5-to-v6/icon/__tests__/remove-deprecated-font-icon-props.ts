import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(
    import.meta.url,
    "remove-deprecated-font-icon-props",
    null,
    fixture,
    {
      parser: "tsx",
    }
  );
};

test("deprecated-props-icon-package");
test("deprecated-props-core-package");
test("deprecated-props-react-md-package");
test("deprecated-props-renamed");
