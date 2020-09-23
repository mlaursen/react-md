import React, { useRef } from "react";
import { render } from "@testing-library/react";

import { useFocusOnMount } from "../useFocusOnMount";

const requestAnimationFrame = jest.spyOn(window, "requestAnimationFrame");
const cancelAnimationFrame = jest.spyOn(window, "cancelAnimationFrame");

const Test = ({
  disabled = false,
  defaultFocus = "first",
  preventScroll = false,
  programatic = false,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useFocusOnMount(ref, defaultFocus, preventScroll, programatic, disabled);
  return (
    <div ref={ref}>
      <button type="button" data-testid="button-1">
        Button 1
      </button>
      <button type="button" data-testid="button-2">
        Button 2
      </button>
    </div>
  );
};

describe("useFocusOnMount", () => {
  beforeEach(() => {
    requestAnimationFrame.mockClear();
    cancelAnimationFrame.mockClear();
    requestAnimationFrame.mockImplementation((cb) => {
      cb(0);
      return 0;
    });
  });

  afterAll(requestAnimationFrame.mockRestore);

  it("should use the requestAnimationFrame if not disabled and cancelAnimationFrame on unmount", () => {
    let { unmount } = render(<Test />);
    expect(requestAnimationFrame).toBeCalledTimes(1);
    expect(cancelAnimationFrame).not.toBeCalled();

    unmount();
    expect(requestAnimationFrame).toBeCalledTimes(1);
    expect(cancelAnimationFrame).toBeCalledTimes(1);

    requestAnimationFrame.mockClear();
    cancelAnimationFrame.mockClear();
    ({ unmount } = render(<Test disabled />));
    unmount();
    expect(requestAnimationFrame).not.toBeCalled();
    expect(cancelAnimationFrame).not.toBeCalled();
  });

  it("should do focus the first element by default", () => {
    const { getByTestId } = render(<Test />);
    expect(document.activeElement).toBe(getByTestId("button-1"));
  });

  it("should be able to focus an element based on the provided defaultFocus", () => {
    let { getByTestId, unmount } = render(<Test defaultFocus="first" />);
    expect(document.activeElement).toBe(getByTestId("button-1"));
    unmount();

    ({ getByTestId, unmount } = render(<Test defaultFocus="last" />));
    expect(document.activeElement).toBe(getByTestId("button-2"));
    unmount();

    ({ getByTestId, unmount } = render(
      <Test defaultFocus="[data-testid='button-2']" />
    ));
    expect(document.activeElement).toBe(getByTestId("button-2"));
    unmount();
  });
});
