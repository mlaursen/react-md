import { Dispatch, SetStateAction } from "react";
import { act, cleanup, testHook } from "react-testing-library";

import useResetValueTimeout from "../useResetValueTimeout";

jest.useFakeTimers();

const setTimeout = window.setTimeout as jest.Mock<typeof window.setTimeout>;
const clearTimeout = window.clearTimeout as jest.Mock<
  typeof window.clearTimeout
>;

describe("useResetValueTimeout", () => {
  beforeEach(() => {
    setTimeout.mockClear();
    clearTimeout.mockClear();
  });

  afterEach(cleanup);

  it("should return a value and a setter function", () => {
    let value;
    let setValue;
    testHook(() => ({ value, setValue } = useResetValueTimeout(null)));

    expect(value).toBeNull();
    expect(setValue).toBeInstanceOf(Function);

    testHook(() => ({ value, setValue } = useResetValueTimeout("")));
    expect(value).toBe("");

    testHook(() => ({ value, setValue } = useResetValueTimeout(500)));
    expect(value).toBe(500);
  });

  it("should trigger a timeout when the setter function is called", () => {
    let value: string = "";
    let setValue: Dispatch<SetStateAction<string>>;
    testHook(() => ({ value, setValue } = useResetValueTimeout("", 500)));

    // each time react renders, it'll call set timeout because of how my tests are setup
    jest.runOnlyPendingTimers();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(value).toBe("");

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(clearTimeout).not.toBeCalled();

    act(() => {
      setValue("hello");
    });

    expect(setTimeout).toHaveBeenCalledTimes(3);
    expect(clearTimeout).not.toBeCalled();
    expect(value).toBe("hello");
    expect(setTimeout.mock.calls[2][1]).toBe(500);

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(setTimeout).toHaveBeenCalledTimes(4);
    expect(clearTimeout).toHaveBeenCalledTimes(1);
    expect(value).toBe("");
  });

  it("should reset the timeout if the setValue is triggered again before the timeout finishes", () => {
    let value: string = "";
    let setValue: Dispatch<SetStateAction<string>>;
    testHook(() => ({ value, setValue } = useResetValueTimeout("", 500)));

    // each time react renders, it'll call set timeout because of how my tests are setup
    jest.runOnlyPendingTimers();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(value).toBe("");

    act(() => {
      setValue("hello");
    });

    expect(setTimeout).toHaveBeenCalledTimes(3);
    expect(clearTimeout).not.toBeCalled();
    expect(value).toBe("hello");

    act(() => {
      setValue("hello, world!");
    });

    expect(setTimeout).toHaveBeenCalledTimes(5);
    expect(clearTimeout).toHaveBeenCalledTimes(1);
    expect(value).toBe("hello, world!");
  });
});
