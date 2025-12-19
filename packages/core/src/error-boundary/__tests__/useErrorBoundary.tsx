import { beforeAll, describe, expect, it, vi } from "vitest";

import { render } from "../../test-utils/index.js";
import { useErrorBoundary } from "../useErrorBoundary.js";

const error = vi.spyOn(console, "error");
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

    expect(() => render(<Test />)).toThrowError(
      "ErrorBoundary has not been mounted"
    );
  });
});
