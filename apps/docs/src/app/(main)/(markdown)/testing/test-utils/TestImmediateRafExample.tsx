import { type ReactElement } from "react";

import TestFrameworkCodeBlock from "../TestFrameworkCodeBlock.jsx";

const BASE_CODE = `
import { jest } from "@jest/globals";
import { testImmediateRaf } from "@react-md/core/test-utils/jest-globals";

afterEach(() => {
  jest.restoreAllMocks();
});

describe("some test suite", () => {
  it("should test something with requestAnimationFrame", () => {
    const raf = testImmediateRaf();

    // do some testing with requestAnimationFrame

    // reset to original at the end of the test if not using \`jest.restoreAllMocks()\`
    raf.mockRestore();
  });
});
`;

export default function TestImmediateRafExample(): ReactElement {
  return (
    <TestFrameworkCodeBlock
      lang="tsx"
      fileName="Request Animation Frame"
      code={{
        jest: BASE_CODE,
        vitest: BASE_CODE.replaceAll("jest-globals", "vitest").replaceAll(
          "jest",
          "vi"
        ),
      }}
    />
  );
}
