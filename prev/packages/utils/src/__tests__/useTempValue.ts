import { act, renderHook } from "@testing-library/react-hooks";

import { useTempValue } from "../useTempValue";

jest.useFakeTimers();

describe("useTempValue", () => {
  beforeEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  it("should trigger a timeout when the setter function is called", () => {
    const { result } = renderHook(() => useTempValue("", 500));

    let [value] = result.current;
    const [, setValue] = result.current;
    expect(value.current).toBe("");

    act(() => {
      setValue("hello");
    });

    [value] = result.current;
    expect(value.current).toBe("hello");

    jest.runAllTimers();
    [value] = result.current;
    expect(value.current).toBe("");
  });

  it("should reset the timeout if the setValue is triggered again before the timeout finishes", () => {
    const { result } = renderHook(() => useTempValue("", 500));

    let [value] = result.current;
    const [, setValue] = result.current;

    act(() => {
      setValue("hello");
    });

    [value] = result.current;
    expect(value.current).toBe("hello");

    act(() => {
      setValue("hello, world!");
    });

    [value] = result.current;
    expect(value.current).toBe("hello, world!");
  });
});
