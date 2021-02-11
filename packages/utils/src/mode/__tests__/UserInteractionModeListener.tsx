import React, { ReactElement } from "react";
import { fireEvent, render } from "@testing-library/react";

import {
  useIsUserInteractionMode,
  UserInteractionModeListener,
  useUserInteractionMode,
} from "../UserInteractionModeListener";

describe("UserInteractionModeListener", () => {
  it("should throw an error if multiple instances are mounted", () => {
    const error = jest.spyOn(console, "error");
    // noop
    error.mockImplementation(() => {});
    expect(() =>
      render(
        <UserInteractionModeListener>
          <UserInteractionModeListener>
            <span />
          </UserInteractionModeListener>
        </UserInteractionModeListener>
      )
    ).toThrowError(
      "Mounted multiple `UserInteractionModeListener` components."
    );

    error.mockRestore();
  });

  it("should update the document.body's className appropriately", () => {
    render(
      <UserInteractionModeListener>
        <span />
      </UserInteractionModeListener>
    );

    expect(document.body.className).toContain("rmd-utils--mouse");

    fireEvent.keyDown(window);
    expect(document.body.className).toContain("rmd-utils--keyboard");

    fireEvent.mouseDown(window);
    expect(document.body.className).toContain("rmd-utils--mouse");

    fireEvent.touchStart(window);
    expect(document.body.className).toContain("rmd-utils--touch");
  });

  it("should swap from touch back to mouse only when the mousemove event has not been triggered after a touchstart event", async () => {
    // this is really a test that should be done in a browser.
    const now = jest
      .spyOn(Date, "now")
      // first touchstart
      .mockImplementationOnce(() => 0)
      // "fake" mousemove after touchstart
      .mockImplementationOnce(() => 9)
      // "real" mousemove
      .mockImplementationOnce(() => 1300)
      // second touchstart
      .mockImplementationOnce(() => 1500)
      // forth touchstart ("mousemove" after contextmenu never calls Date.now()
      // due to short circuiting)
      .mockImplementationOnce(() => 4000)
      // "fake" mousemove after touchstart
      .mockImplementationOnce(() => 4003)
      // "real" mousemove
      .mockImplementationOnce(() => 6000);

    render(
      <UserInteractionModeListener>
        <span />
      </UserInteractionModeListener>
    );
    expect(document.body.className).toContain("rmd-utils--mouse");

    fireEvent.touchStart(window);
    fireEvent.mouseMove(window);
    expect(document.body.className).toContain("rmd-utils--touch");

    fireEvent.mouseMove(window);
    expect(document.body.className).toContain("rmd-utils--mouse");

    fireEvent.touchStart(window);
    expect(document.body.className).toContain("rmd-utils--touch");

    fireEvent.contextMenu(window);
    fireEvent.mouseMove(window);
    expect(document.body.className).toContain("rmd-utils--touch");

    fireEvent.touchStart(window);
    fireEvent.mouseMove(window);
    expect(document.body.className).toContain("rmd-utils--touch");

    fireEvent.mouseMove(window);
    expect(document.body.className).toContain("rmd-utils--mouse");

    now.mockRestore();
  });
});

describe("hooks", () => {
  it("should correctly provide the the UserInteractionMode in the useUserInteractionMode hook", () => {
    function Test(): ReactElement {
      const mode = useUserInteractionMode();

      return <span data-testid="mode">{mode}</span>;
    }

    const { getByTestId } = render(
      <UserInteractionModeListener>
        <Test />
      </UserInteractionModeListener>
    );

    const mode = getByTestId("mode");
    expect(mode.textContent).toBe("mouse");

    fireEvent.keyDown(window);
    expect(mode.textContent).toBe("keyboard");

    fireEvent.touchStart(window);
    expect(mode.textContent).toBe("touch");
  });

  it("should correctly match the the UserInteractionMode in the useIsUserInteractionMode hook", () => {
    function Test(): ReactElement {
      const isMouse = useIsUserInteractionMode("mouse");
      const isTouch = useIsUserInteractionMode("touch");
      const isKeyboard = useIsUserInteractionMode("keyboard");

      return (
        <>
          {isMouse && <span>Mouse</span>}
          {isTouch && <span>Touch</span>}
          {isKeyboard && <span>Keyboard</span>}
        </>
      );
    }

    const { getByText } = render(
      <UserInteractionModeListener>
        <Test />
      </UserInteractionModeListener>
    );

    expect(() => getByText("Mouse")).not.toThrow();
    expect(() => getByText("Touch")).toThrow();
    expect(() => getByText("Keyboard")).toThrow();

    fireEvent.keyDown(window);
    expect(() => getByText("Mouse")).toThrow();
    expect(() => getByText("Touch")).toThrow();
    expect(() => getByText("Keyboard")).not.toThrow();

    fireEvent.touchStart(window);
    expect(() => getByText("Mouse")).toThrow();
    expect(() => getByText("Touch")).not.toThrow();
    expect(() => getByText("Keyboard")).toThrow();
  });
});
