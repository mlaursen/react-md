import { renderHook } from "@testing-library/react-hooks";

import usePosition from "../usePosition";

describe("usePosition", () => {
  it("should set the position to the defaultPosition unless the position option was applied", () => {
    let { result } = renderHook(() =>
      usePosition({ defaultPosition: "below", threshold: 0 })
    );
    expect(result.current.position).toBe("below");

    ({ result } = renderHook(() =>
      usePosition({ defaultPosition: "above", threshold: 0 })
    ));
    expect(result.current.position).toBe("above");

    ({ result } = renderHook(() =>
      usePosition({
        position: "below",
        defaultPosition: "above",
        threshold: 0,
      })
    ));
    expect(result.current.position).toBe("below");

    ({ result } = renderHook(() =>
      usePosition({
        position: "above",
        defaultPosition: "below",
        threshold: 0,
      })
    ));
    expect(result.current.position).toBe("above");
  });
});
