import { mocked } from "ts-jest/utils";
import { act, cleanup, renderHook } from "react-hooks-testing-library";
import useTempValue from "../useTempValue";

jest.useFakeTimers();
const setTimeout = mocked(window.setTimeout);
const clearTimeout = mocked(window.clearTimeout);

describe("useTempValue", () => {
  beforeEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  afterEach(cleanup);

  it("should return the correct object", () => {
    const { result } = renderHook(() => useTempValue(null));

    expect(result.current).toEqual({
      valueRef: { current: null },
      setValue: expect.any(Function),
      resetValue: expect.any(Function),
    });
  });

  it("should trigger a timeout when the setter function is called", () => {
    const { result } = renderHook(() => useTempValue("", 500));

    expect(result.current.valueRef.current).toBe("");
    expect(setTimeout).not.toBeCalled();
    expect(clearTimeout).not.toBeCalled();

    act(() => {
      result.current.setValue("hello");
    });

    expect(result.current.valueRef.current).toBe("hello");
    expect(setTimeout).toBeCalledTimes(1);
    expect(clearTimeout).toBeCalledTimes(1);
    expect(setTimeout).toBeCalledWith(expect.any(Function), 500);

    jest.runAllTimers();
    expect(result.current.valueRef.current).toBe("");
    expect(setTimeout).toBeCalledTimes(1);
    expect(clearTimeout).toBeCalledTimes(2);
  });

  it("should reset the timeout if the setValue is triggered again before the timeout finishes", () => {
    const { result } = renderHook(() => useTempValue("", 500));

    act(() => {
      result.current.setValue("hello");
    });

    expect(setTimeout).toBeCalledTimes(1);
    expect(clearTimeout).toBeCalledTimes(1);
    expect(result.current.valueRef.current).toBe("hello");

    act(() => {
      result.current.setValue("hello, world!");
    });

    expect(setTimeout).toBeCalledTimes(2);
    expect(clearTimeout).toHaveBeenCalledTimes(2);
    expect(result.current.valueRef.current).toBe("hello, world!");
  });
});
