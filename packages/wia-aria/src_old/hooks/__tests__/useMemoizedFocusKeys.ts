import { cleanup, renderHook } from "react-hooks-testing-library";
import useMemoizedFocusKeys from "../useMemoizedFocusKeys";

describe("useMemoizedFocusKeys", () => {
  afterEach(cleanup);

  it("should return the correct list of keys", () => {
    let value;
    renderHook(
      () =>
        (value = useMemoizedFocusKeys({
          incrementKeys: ["ArrowDown"],
          decrementKeys: ["ArrowUp"],
          jumpToFirstKeys: ["Home"],
          jumpToLastKeys: ["End"],
        }))
    );

    expect(value).toEqual([
      {
        key: "ArrowDown",
        type: "increment",
        altKey: false,
        metaKey: false,
        shiftKey: false,
      },
      {
        key: "ArrowUp",
        type: "decrement",
        altKey: false,
        metaKey: false,
        shiftKey: false,
      },
      {
        key: "Home",
        type: "first",
        altKey: false,
        metaKey: false,
        shiftKey: false,
      },
      {
        key: "End",
        type: "last",
        altKey: false,
        metaKey: false,
        shiftKey: false,
      },
    ]);
  });

  it("should default to using Tab and Shift+Tab", () => {
    let value;
    renderHook(() => (value = useMemoizedFocusKeys({})));

    expect(value).toEqual([
      {
        key: "Tab",
        type: "increment",
        altKey: false,
        metaKey: false,
        shiftKey: false,
      },
      {
        key: "Tab",
        type: "decrement",
        altKey: false,
        metaKey: false,
        shiftKey: true,
      },
    ]);
  });
});
