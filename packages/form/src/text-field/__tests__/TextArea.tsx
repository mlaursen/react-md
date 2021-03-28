// TODO: Figure out how to test the resize behavior in jsdom, or just write
// tests with cypress
import React, { ReactElement, useState } from "react";
import { act, fireEvent, render } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import { ResizeObserver } from "@juggle/resize-observer";

import { TextArea } from "../TextArea";

jest.mock("@juggle/resize-observer");

const ResizeObserverMock = mocked(ResizeObserver);
const DEFAULT_DOM_RECT: DOMRectReadOnly = {
  x: 0,
  y: 0,
  // this is the size with the default theme and a label on desktop
  height: 56,
  // just a random width
  width: 120,
  bottom: 0,
  left: 0,
  top: 0,
  right: 0,
  toJSON: () => "",
};

// TODO: Look into a way to maybe export this mock since it can be useful in
// other tests. This is really a copy/paste as a simplified version from the
// `useResizeObserver` tests
class MockedObserver implements ResizeObserver {
  public _callback: ResizeObserverCallback;

  public _elements: Element[];

  public constructor(callback: ResizeObserverCallback) {
    this._elements = [];
    this._callback = callback;
  }

  public observe(target: Element): void {
    this._elements.push(target);
  }

  public unobserve(target: Element): void {
    this._elements = this._elements.filter((el) => el !== target);
  }

  public disconnect(): void {
    this._elements = [];
  }

  public trigger(rect: Partial<DOMRectReadOnly> = {}) {
    const contentRect: DOMRectReadOnly = {
      ...rect,
      ...DEFAULT_DOM_RECT,
    };

    act(() => {
      this._callback(
        this._elements.map((target) => ({
          target,
          contentRect,
          borderBoxSize: [],
          contentBoxSize: [],
        })),
        this
      );
    });
  }
}

describe("TextArea", () => {
  let observer: MockedObserver | undefined;
  beforeAll(() => {
    ResizeObserverMock.mockImplementation((callback) => {
      // @ts-ignore
      observer = new MockedObserver(callback);
      return observer;
    });
  });

  beforeEach(() => {
    observer?.disconnect();
  });

  afterAll(() => {
    ResizeObserverMock.mockRestore();
  });

  it("should handle updating the height correctly based on the resize prop", () => {
    const props = {
      id: "text-area",
      resize: "auto" as const,
      label: "Label",
      "data-testid": "container",
    };

    const { container, rerender } = render(<TextArea {...props} />);
    const realContainer = container.firstElementChild;
    if (!observer || !realContainer) {
      throw new Error();
    }

    observer.trigger();
    // Note: The height should be 0 since none of the styles are available in
    // this runtime
    expect(realContainer).toMatchSnapshot();

    rerender(<TextArea {...props} resize="none" />);
    expect(realContainer).toMatchSnapshot();
  });

  it("should focus the textarea if the container is clicked", () => {
    const { container, getByRole } = render(
      <TextArea id="text-area" label="Label" />
    );

    const realContainer = container.firstElementChild;
    if (!realContainer) {
      throw new Error();
    }

    fireEvent.click(realContainer);
    expect(document.activeElement).toBe(getByRole("textbox"));
  });

  it("should force the inline prop if the resize prop is horizontal or both", () => {
    const props = {
      id: "text-area",
      label: "Label",
    };
    const { container, rerender } = render(
      <TextArea {...props} resize="auto" />
    );
    const realContainer = container.firstElementChild;
    if (!realContainer) {
      throw new Error();
    }

    expect(realContainer).not.toHaveClass("rmd-text-field-container--inline");

    rerender(<TextArea {...props} resize="none" />);
    expect(realContainer).not.toHaveClass("rmd-text-field-container--inline");

    rerender(<TextArea {...props} resize="vertical" />);
    expect(realContainer).not.toHaveClass("rmd-text-field-container--inline");

    rerender(<TextArea {...props} resize="both" />);
    expect(realContainer).toHaveClass("rmd-text-field-container--inline");

    rerender(<TextArea {...props} resize="horizontal" />);
    expect(realContainer).toHaveClass("rmd-text-field-container--inline");
  });

  it("should handle the floating label state correctly for controlled values", () => {
    function Test(): ReactElement {
      const [value, setValue] = useState("");

      return (
        <>
          <button type="button" onClick={() => setValue("100")}>
            Set
          </button>
          <button type="button" onClick={() => setValue("")}>
            Reset
          </button>
          <TextArea
            id="field-id"
            label="Label"
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
          />
        </>
      );
    }

    const { getByRole, getByText } = render(<Test />);

    const setButton = getByRole("button", { name: "Set" });
    const resetButton = getByRole("button", { name: "Reset" });
    const field = getByRole("textbox") as HTMLInputElement;
    const label = getByText("Label");
    expect(label.className).not.toContain("rmd-floating-label--active");
    expect(label.className).not.toContain("rmd-floating-label--inactive");

    fireEvent.click(setButton);
    expect(label.className).toContain("rmd-floating-label--active");
    expect(label.className).toContain("rmd-floating-label--inactive");

    fireEvent.focus(field);
    fireEvent.change(field, { target: { value: "100-" } });
    expect(label.className).toContain("rmd-floating-label--active");
    expect(label.className).not.toContain("rmd-floating-label--inactive");

    fireEvent.blur(field);
    expect(label.className).toContain("rmd-floating-label--active");
    expect(label.className).toContain("rmd-floating-label--inactive");

    fireEvent.click(resetButton);
    expect(label.className).not.toContain("rmd-floating-label--active");
    expect(label.className).not.toContain("rmd-floating-label--inactive");
  });
});
