import { type ReactElement } from "react";
import { describe, expect, it, vi } from "vitest";

import { fireEvent, render, screen } from "../../test-utils/index.js";
import {
  UserInteractionModeProvider,
  useUserInteractionMode,
} from "../UserInteractionModeProvider.js";

describe("UserInteractionModeProvider", () => {
  it("should throw an error if multiple instances are mounted", () => {
    const error = vi.spyOn(console, "error");
    error.mockImplementation(() => {});
    expect(() =>
      render(
        <UserInteractionModeProvider>
          <UserInteractionModeProvider>
            <span />
          </UserInteractionModeProvider>
        </UserInteractionModeProvider>
      )
    ).toThrowError(
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

    fireEvent.keyDown(globalThis.window);
    expect(document.body.className).toContain("keyboard-mode");

    fireEvent.mouseDown(globalThis.window);
    expect(document.body.className).toContain("mouse-mode");

    fireEvent.touchStart(globalThis.window);
    expect(document.body.className).toContain("touch-mode");
  });

  it("should swap from touch back to mouse only when the mousemove event has not been triggered after a touchstart event", () => {
    // this is really a test that should be done in a browser.
    const now = vi
      .fn()
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
      // @ts-expect-error this is a hidden type only added for tests
      <UserInteractionModeProvider now={now}>
        <span />
      </UserInteractionModeProvider>
    );
    expect(document.body.className).toContain("mouse-mode");

    fireEvent.touchStart(globalThis.window);
    fireEvent.mouseMove(globalThis.window);
    expect(document.body.className).toContain("touch-mode");

    fireEvent.mouseMove(globalThis.window);
    expect(document.body.className).toContain("mouse-mode");

    fireEvent.touchStart(globalThis.window);
    expect(document.body.className).toContain("touch-mode");

    fireEvent.contextMenu(globalThis.window);
    fireEvent.mouseMove(globalThis.window);
    expect(document.body.className).toContain("touch-mode");

    fireEvent.touchStart(globalThis.window);
    fireEvent.mouseMove(globalThis.window);
    expect(document.body.className).toContain("touch-mode");

    fireEvent.mouseMove(globalThis.window);
    expect(document.body.className).toContain("mouse-mode");

    now.mockRestore();
  });

  it("should allow for a child component to access the UserInteractionMode with the useUserInteractionMode hook", () => {
    function Test(): ReactElement {
      const mode = useUserInteractionMode();

      return <span data-testid="mode">{mode}</span>;
    }

    render(
      <UserInteractionModeProvider>
        <Test />
      </UserInteractionModeProvider>
    );

    const mode = screen.getByTestId("mode");
    expect(mode).toHaveTextContent("mouse");

    fireEvent.keyDown(globalThis.window);
    expect(mode).toHaveTextContent("keyboard");

    fireEvent.touchStart(globalThis.window);
    expect(mode).toHaveTextContent("touch");
  });
});
