import { cleanup } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import useKeyboardMovement from "../useKeyboardMovement";

afterEach(cleanup);

describe("useKeyboardMovement", () => {
  it("should actually have tests at some point", () => {
    const { result } = renderHook(() => useKeyboardMovement({}));
    expect(result.current).toBeInstanceOf(Function);
  });
});
