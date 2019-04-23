import { MutableRefObject } from "react";
import { act, cleanup, renderHook } from "react-hooks-testing-library";
import useTempValue from "../useTempValue";

jest.useFakeTimers();

const setTimeout = window.setTimeout as jest.Mock;
const clearTimeout = window.clearTimeout as jest.Mock;

describe("useTempValue", () => {
  beforeEach(() => {
    setTimeout.mockClear();
    clearTimeout.mockClear();
  });

  afterEach(cleanup);

  it("should return the correct object", () => {
    let config;
    renderHook(() => (config = useTempValue(null)));

    expect(config).toMatchObject({
      valueRef: { current: null },
      setValue: expect.any(Function),
      resetValue: expect.any(Function),
    });
  });

  it("should trigger a timeout when the setter function is called", () => {
    let valueRef: MutableRefObject<string> = { current: "" };
    let setValue: (v: string) => void;
    renderHook(() => ({ valueRef, setValue } = useTempValue("", 500)));

    expect(valueRef.current).toBe("");
    expect(setTimeout).not.toBeCalled();
    expect(clearTimeout).not.toBeCalled();

    act(() => {
      setValue("hello");
    });

    expect(valueRef.current).toBe("hello");
    expect(setTimeout).toBeCalledTimes(1);
    expect(clearTimeout).toBeCalledTimes(1);
    expect(setTimeout.mock.calls[0][1]).toBe(500);

    jest.runOnlyPendingTimers();
    expect(valueRef.current).toBe("");
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(clearTimeout).toBeCalledTimes(2);
  });

  it("should reset the timeout if the setValue is triggered again before the timeout finishes", () => {
    let valueRef: MutableRefObject<string> = { current: "" };
    let setValue: (v: string) => void;
    renderHook(() => ({ valueRef, setValue } = useTempValue("", 500)));

    act(() => {
      setValue("hello");
    });

    expect(setTimeout).toBeCalledTimes(1);
    expect(clearTimeout).toBeCalledTimes(1);
    expect(valueRef.current).toBe("hello");

    act(() => {
      setValue("hello, world!");
    });

    expect(setTimeout).toBeCalledTimes(2);
    expect(clearTimeout).toHaveBeenCalledTimes(2);
    expect(valueRef.current).toBe("hello, world!");
  });
});
