import { act, renderHook } from "@testing-library/react-hooks";
import { mocked } from "ts-jest/utils";

import useTempValue from "../useTempValue";

jest.useFakeTimers();
const setTimeout = mocked(window.setTimeout);
const clearTimeout = mocked(window.clearTimeout);

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
    expect(setTimeout).not.toBeCalled();
    expect(clearTimeout).not.toBeCalled();

    act(() => {
      setValue("hello");
    });

    [value] = result.current;
    expect(value.current).toBe("hello");
    expect(setTimeout).toBeCalledTimes(1);
    expect(clearTimeout).toBeCalledTimes(1);
    expect(setTimeout).toBeCalledWith(expect.any(Function), 500);

    jest.runAllTimers();
    [value] = result.current;
    expect(value.current).toBe("");
    expect(setTimeout).toBeCalledTimes(1);
    expect(clearTimeout).toBeCalledTimes(2);
  });

  it("should reset the timeout if the setValue is triggered again before the timeout finishes", () => {
    const { result } = renderHook(() => useTempValue("", 500));

    let [value] = result.current;
    const [, setValue] = result.current;

    act(() => {
      setValue("hello");
    });

    [value] = result.current;
    expect(setTimeout).toBeCalledTimes(1);
    expect(clearTimeout).toBeCalledTimes(1);
    expect(value.current).toBe("hello");

    act(() => {
      setValue("hello, world!");
    });

    [value] = result.current;
    expect(setTimeout).toBeCalledTimes(2);
    expect(clearTimeout).toHaveBeenCalledTimes(2);
    expect(value.current).toBe("hello, world!");
  });
});
