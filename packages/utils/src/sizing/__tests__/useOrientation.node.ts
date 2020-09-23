/**
 * @jest-environment node
 */
import { renderHook } from "@testing-library/react-hooks";
import { useOrientation } from "../useOrientation";

describe("useOrientation", () => {
  it("should default to landscape primary if the window is undefined", () => {
    const { result } = renderHook(() => useOrientation());
    expect(result.current).toBe("landscape-primary");
  });
});
