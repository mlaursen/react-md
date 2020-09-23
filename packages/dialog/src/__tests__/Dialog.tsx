import React from "react";
import { render, waitFor } from "@testing-library/react";

import { Dialog } from "../Dialog";
import { DialogContent } from "../DialogContent";

describe("Dialog", () => {
  it("should render correctly (with snapshots)", () => {
    const props = {
      id: "dialog-1",
      "aria-label": "Dialog",
      visible: false,
      onRequestClose: jest.fn(),
    };

    const { baseElement, rerender } = render(<Dialog {...props} />);
    expect(baseElement).toMatchSnapshot();

    rerender(<Dialog {...props} visible />);
    expect(baseElement).toMatchSnapshot();

    rerender(<Dialog {...props} />);
    expect(baseElement).toMatchSnapshot();

    // testing full page
    rerender(<Dialog {...props} type="full-page" visible />);
    expect(baseElement).toMatchSnapshot();

    rerender(<Dialog {...props} type="full-page" />);
    expect(baseElement).toMatchSnapshot();
  });

  it("should render the overlay before the dialog container since they have the same z-index to prevent the overlay from covering the dialog", () => {
    const props = {
      id: "dialog",
      "aria-label": "a",
      visible: true,
      onRequestClose: jest.fn(),
      children: <button type="button" />,
    };

    const { baseElement } = render(<Dialog {...props} />);
    expect(baseElement).toMatchSnapshot();
    const container = document.getElementById("dialog-container");
    const overlay = document.getElementById("dialog-overlay");
    if (!container || !overlay) {
      throw new Error();
    }

    expect(overlay.nextElementSibling).toEqual(container);
  });

  describe("a11y", () => {
    const props = {
      id: "dialog-id",
      "aria-label": "Dialog",
      onRequestClose: jest.fn(),
      children: (
        <DialogContent>
          <button id="button-1" type="button">
            Button 1
          </button>
          <button id="button-2" type="button">
            Button 2
          </button>
        </DialogContent>
      ),
    };

    const getDialog = () =>
      document.getElementById("dialog-id") as HTMLDivElement;
    const getButton1 = () =>
      document.getElementById("button-1") as HTMLButtonElement;

    it("should automatically focus the first focusable element in the dialog on mount and focus the previous element on unmount", async () => {
      const { rerender } = render(
        <>
          <button id="main-button" type="button" autoFocus>
            Button
          </button>
          <Dialog {...props} visible={false} />
        </>
      );
      const mainButton = document.getElementById("main-button");
      expect(document.activeElement).toBe(mainButton);

      rerender(
        <>
          <button id="main-button" type="button" autoFocus>
            Button
          </button>
          <Dialog {...props} visible />
        </>
      );

      await waitFor(() => {
        if (document.activeElement === mainButton) {
          throw new Error();
        }
      });

      expect(document.activeElement).toBe(getButton1());

      rerender(
        <>
          <button id="main-button" type="button" autoFocus>
            Button
          </button>
          <Dialog {...props} visible={false} />
        </>
      );

      await waitFor(() => {
        // the document.body will be focused immediately after unmount, and then an animation frame
        // will focus the main button
        if (getDialog() || document.activeElement === document.body) {
          throw new Error();
        }
      });
      expect(document.activeElement).toBe(mainButton);
    });
  });
});
