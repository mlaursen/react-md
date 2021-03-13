import React, { ReactElement } from "react";
import { render } from "@testing-library/react";

import { FocusContainer, FocusContainerProps } from "../FocusContainer";

const requestAnimationFrame = jest.spyOn(window, "requestAnimationFrame");

type TestProps = FocusContainerProps & { visible: boolean };
function Test({ visible, ...props }: TestProps): ReactElement {
  return (
    <>
      <button id="main-button" type="button" autoFocus>
        Button
      </button>
      {visible && (
        <FocusContainer {...props}>
          <button id="button-1" type="button">
            Button 1
          </button>
          <button id="button-2" type="button">
            Button 2
          </button>
          <button id="button-3" type="button">
            Button 3
          </button>
        </FocusContainer>
      )}
    </>
  );
}

beforeEach(() => {
  requestAnimationFrame.mockClear();
  requestAnimationFrame.mockImplementation((cb) => {
    cb(0);
    return 0;
  });
});

afterAll(() => {
  requestAnimationFrame.mockRestore();
});

describe("FocusContainer", () => {
  it("should handle the focus mounting flow correctly", () => {
    const getMainButton = () => document.getElementById("main-button");
    const getButton1 = () => document.getElementById("button-1");

    const { rerender } = render(<Test visible={false} />);
    expect(document.activeElement).toBe(getMainButton());

    rerender(<Test visible />);
    expect(document.activeElement).toBe(getButton1());

    rerender(<Test visible={false} />);
    expect(document.activeElement).toBe(getMainButton());
  });

  it("should not focus any elements while the disableFocusOnMount and disableFocusOnUnmount props are true", () => {
    const getMainButton = () => document.getElementById("main-button");

    const { rerender } = render(
      <Test visible={false} disableFocusOnMount disableFocusOnUnmount />
    );
    expect(document.activeElement).toBe(getMainButton());

    rerender(<Test visible disableFocusOnMount disableFocusOnUnmount />);
    expect(document.activeElement).toBe(getMainButton());

    rerender(<Test visible={false} disableTabFocusWrap />);
    expect(document.activeElement).toBe(getMainButton());
  });

  it("should render correctly (with snapshots)", () => {
    const { container, rerender } = render(
      <FocusContainer>
        <a href="#">Link</a>
      </FocusContainer>
    );
    expect(container).toMatchSnapshot();

    rerender(
      <FocusContainer component="span">
        <button id="button-1" type="button">
          Button
        </button>
      </FocusContainer>
    );
    expect(container).toMatchSnapshot();
  });
});
