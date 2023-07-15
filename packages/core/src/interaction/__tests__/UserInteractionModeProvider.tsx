import type { ReactElement } from "react";
import { fireEvent, render } from "../../test-utils";

import {
  UserInteractionModeProvider,
  useUserInteractionMode,
} from "../UserInteractionModeProvider";

describe("UserInteractionModeProvider", () => {
  it("should throw an error if multiple instances are mounted", () => {
    const error = jest.spyOn(console, "error");
    error.mockImplementation(() => {});
    expect(() =>
      render(
        <UserInteractionModeProvider>
          <UserInteractionModeProvider>
            <span />
          </UserInteractionModeProvider>
        </UserInteractionModeProvider>
      )
    ).toThrow(
      "The `UserInteractionModeProvider` cannot be mounted multiple times."
    );

    error.mockRestore();
  });

  it("should update the document.body's className appropriately", () => {
    render(
      <UserInteractionModeProvider>
        <span />
      </UserInteractionModeProvider>
    );

    expect(document.body.className).toContain("mouse-mode");

    fireEvent.keyDown(window);
    expect(document.body.className).toContain("keyboard-mode");

    fireEvent.mouseDown(window);
    expect(document.body.className).toContain("mouse-mode");

    fireEvent.touchStart(window);
    expect(document.body.className).toContain("touch-mode");
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
      <UserInteractionModeProvider>
        <span />
      </UserInteractionModeProvider>
    );
    expect(document.body.className).toContain("mouse-mode");

    fireEvent.touchStart(window);
    fireEvent.mouseMove(window);
    expect(document.body.className).toContain("touch-mode");

    fireEvent.mouseMove(window);
    expect(document.body.className).toContain("mouse-mode");

    fireEvent.touchStart(window);
    expect(document.body.className).toContain("touch-mode");

    fireEvent.contextMenu(window);
    fireEvent.mouseMove(window);
    expect(document.body.className).toContain("touch-mode");

    fireEvent.touchStart(window);
    fireEvent.mouseMove(window);
    expect(document.body.className).toContain("touch-mode");

    fireEvent.mouseMove(window);
    expect(document.body.className).toContain("mouse-mode");

    now.mockRestore();
  });

  it("should allow for a child component to access the UserInteractionMode with the useUserInteractionMode hook", () => {
    function Test(): ReactElement {
      const mode = useUserInteractionMode();

      return <span data-testid="mode">{mode}</span>;
    }

    const { getByTestId } = render(
      <UserInteractionModeProvider>
        <Test />
      </UserInteractionModeProvider>
    );

    const mode = getByTestId("mode");
    expect(mode.textContent).toBe("mouse");

    fireEvent.keyDown(window);
    expect(mode.textContent).toBe("keyboard");

    fireEvent.touchStart(window);
    expect(mode.textContent).toBe("touch");
  });
});
