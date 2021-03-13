import React, { ReactElement } from "react";
import { render } from "@testing-library/react";

import { FocusFallback, usePreviousFocus } from "../usePreviousFocus";

const requestAnimationFrame = jest.spyOn(window, "requestAnimationFrame");
beforeEach(() => {
  requestAnimationFrame.mockClear();
  // need the frame to be run sync for testing this
  requestAnimationFrame.mockImplementation((cb) => {
    cb(0);
    return 0;
  });
});
afterAll(requestAnimationFrame.mockRestore);

interface TestProps {
  disabled: boolean;
  fallback?: FocusFallback;
  previousElement?: HTMLElement | null;
}

function Test({
  disabled,
  fallback,
  previousElement = null,
}: TestProps): ReactElement {
  usePreviousFocus(disabled, fallback, previousElement);

  return (
    <button type="button" id="button-2" autoFocus>
      Button 2
    </button>
  );
}

interface TestComponentProps extends TestProps {
  mounted: boolean;
  buttonMounted?: boolean;
}

function TestComponent({
  mounted,
  buttonMounted = true,
  ...props
}: TestComponentProps): ReactElement {
  return (
    <>
      {buttonMounted && (
        <button type="button" id="button-1" autoFocus>
          Button 1
        </button>
      )}
      {mounted && <Test {...props} />}
    </>
  );
}

// eslint-disable-next-line jest/no-disabled-tests
describe.skip("usePreviousFocus", () => {
  it("should attempt to focus the previous active element in the dom when the component unmounts", () => {
    const { rerender, queryByText } = render(
      <TestComponent mounted={false} disabled={false} />
    );

    const button1 = queryByText("Button 1");
    expect(button1).not.toBeNull();
    expect(document.activeElement).toBe(button1);

    rerender(<TestComponent mounted disabled={false} />);

    const button2 = queryByText("Button 2");
    expect(document.activeElement).toBe(button2);

    rerender(<TestComponent mounted={false} disabled={false} />);
    expect(document.activeElement).toBe(button1);
  });

  it("should request an animation frame and then check if the previous focus exists in the dom", () => {
    const docContains = jest.spyOn(document, "contains");
    const { rerender, queryByText } = render(
      <TestComponent mounted={false} disabled={false} />
    );
    expect(requestAnimationFrame).not.toBeCalled();

    rerender(<TestComponent mounted disabled={false} />);
    expect(requestAnimationFrame).not.toBeCalled();

    // start testing unmount...
    rerender(<TestComponent mounted={false} disabled={false} />);
    expect(requestAnimationFrame).toBeCalledTimes(1);
    expect(docContains).toBeCalledWith(queryByText("Button 1"));
    docContains.mockRestore();
  });

  it("should use the fallback value if the previous focus no longer exists in the dom when the component unmounts for string fallbacks", () => {
    const fallbackEl = document.createElement("button");
    document.body.appendChild(fallbackEl);

    const docContains = jest.spyOn(document, "contains");
    const querySelector = jest.spyOn(document, "querySelector");
    querySelector.mockImplementation((query) =>
      query === "#fallback" ? fallbackEl : null
    );

    const { rerender, queryByText } = render(
      <TestComponent mounted={false} disabled={false} fallback="#fallback" />
    );
    rerender(<TestComponent mounted disabled={false} fallback="#fallback" />);

    const button1 = queryByText("Button 1");
    docContains.mockImplementation((el) => el !== button1);

    rerender(
      <TestComponent
        mounted={false}
        buttonMounted={false}
        disabled={false}
        fallback="#fallback"
      />
    );
    expect(docContains).toBeCalledWith(button1);
    expect(querySelector).toBeCalledWith("#fallback");
    expect(document.activeElement).toBe(fallbackEl);

    docContains.mockRestore();
    document.body.removeChild(fallbackEl);
  });

  it("should use the fallback value if the previous focus no longer exists in the dom when the component unmounts for function fallbacks", () => {
    const fallbackEl = document.createElement("button");
    document.body.appendChild(fallbackEl);

    const docContains = jest.spyOn(document, "contains");

    const getFallback = jest.fn(() => fallbackEl);
    const { rerender, queryByText } = render(
      <TestComponent mounted={false} disabled={false} fallback={getFallback} />
    );
    rerender(<TestComponent mounted disabled={false} fallback={getFallback} />);

    const button1 = queryByText("Button 1");
    docContains.mockImplementation((el) => el !== button1);

    rerender(
      <TestComponent
        mounted={false}
        buttonMounted={false}
        disabled={false}
        fallback={getFallback}
      />
    );
    expect(docContains).toBeCalledWith(button1);
    expect(getFallback).toBeCalledTimes(1);
    expect(document.activeElement).toBe(fallbackEl);

    docContains.mockRestore();
    document.body.removeChild(fallbackEl);
  });

  it("should use the fallback value if the previous focus no longer exists in the dom when the component unmounts for HTMLElement fallbacks", () => {
    const fallbackEl = document.createElement("button");
    document.body.appendChild(fallbackEl);

    const docContains = jest.spyOn(document, "contains");
    const { rerender, queryByText } = render(
      <TestComponent mounted={false} disabled={false} fallback={fallbackEl} />
    );
    rerender(<TestComponent mounted disabled={false} fallback={fallbackEl} />);

    const button1 = queryByText("Button 1");
    docContains.mockImplementation((el) => el !== button1);

    rerender(
      <TestComponent
        mounted={false}
        buttonMounted={false}
        disabled={false}
        fallback={fallbackEl}
      />
    );
    expect(docContains).toBeCalledWith(button1);
    expect(document.activeElement).toBe(fallbackEl);

    docContains.mockRestore();
    document.body.removeChild(fallbackEl);
  });

  it("should do nothing if disabled", () => {
    const { rerender } = render(<TestComponent mounted={false} disabled />);
    expect(requestAnimationFrame).not.toBeCalled();

    rerender(<TestComponent mounted disabled />);
    expect(requestAnimationFrame).not.toBeCalled();

    rerender(<TestComponent mounted={false} disabled />);
    expect(requestAnimationFrame).not.toBeCalled();
  });
});
