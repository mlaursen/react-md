import { beforeAll, describe, expect, it, jest } from "@jest/globals";

import { render } from "../../test-utils/index.js";
import { useErrorBoundary } from "../useErrorBoundary.js";

const error = jest.spyOn(console, "error");
beforeAll(() => {
  // hide error messages
  error.mockImplementation(() => {});
});

describe("useErrorBoundary", () => {
  it("should throw an error if the ErrorBoundary was not defined beforehand", () => {
    function Test(): null {
      useErrorBoundary();
      return null;
    }

    expect(() => render(<Test />)).toThrow(
      "ErrorBoundary has not been mounted"
    );
  });
});
