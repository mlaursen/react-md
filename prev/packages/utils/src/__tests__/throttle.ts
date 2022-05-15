import { throttle } from "../throttle";

jest.useFakeTimers();

describe("throttle", () => {
  it("should return a throttled function that is called on leading and trailing calls by default", () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 300);

    throttled();
    throttled();

    expect(fn).toBeCalledTimes(1);

    jest.advanceTimersByTime(200);
    throttled();
    expect(fn).toBeCalledTimes(1);

    jest.advanceTimersByTime(100);
    throttled();
    expect(fn).toBeCalledTimes(2);

    jest.advanceTimersByTime(100);
    throttled();
    throttled();
    expect(fn).toBeCalledTimes(2);

    jest.advanceTimersByTime(300);
    expect(fn).toBeCalledTimes(3);
  });

  it("should call the throttled function with all the provided arguments", () => {
    const test = jest.fn(
      (a: string, b: number, c: boolean) => `${a} ${b} ${c}`
    );

    const throttled = throttle(test, 300);

    expect(throttled("hello", 3, false)).toBe("hello 3 false");

    // since time hasn't advanced, these shouldn't actually update the value
    expect(throttled("hello", 4, false)).toBe("hello 3 false");
    expect(test).toBeCalledTimes(1);

    jest.advanceTimersByTime(300);
    // now that time has advanced, the value
    expect(test).toBeCalledWith("hello", 4, false);
    expect(test).toBeCalledTimes(2);
  });

  it("should call with the latest value if it's called multiple times", () => {
    const test = jest.fn((a: string) => a);
    const throttled = throttle(test, 1000);

    expect(throttled("hello")).toBe("hello");

    jest.advanceTimersByTime(100);
    expect(throttled("world")).toBe("hello");
    expect(throttled("something")).toBe("hello");

    jest.advanceTimersByTime(1000);
    expect(throttled("something else")).toBe("something");
  });

  it("should work with promises", () => {
    const user = { id: "fake-id", name: "FirstName LastName" };
    const json = () => Promise.resolve(user);
    const fakeFetch = jest.fn((_url: string) => Promise.resolve({ json }));
    const throttled = throttle(fakeFetch, 500);

    // pretend a user is typing for a search endpoint
    throttled("s");
    jest.advanceTimersByTime(100);
    throttled("sea");

    jest.advanceTimersByTime(100);
    throttled("search");

    expect(fakeFetch).toBeCalledWith("s");
    expect(fakeFetch).not.toBeCalledWith("sea");
    expect(fakeFetch).not.toBeCalledWith("search");

    // user stopped typing
    jest.advanceTimersByTime(400);
    expect(fakeFetch).toBeCalledWith("s");
    expect(fakeFetch).not.toBeCalledWith("sea");
    expect(fakeFetch).toBeCalledWith("search");
  });
});
