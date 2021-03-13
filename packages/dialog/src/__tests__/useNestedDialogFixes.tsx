import React, { MutableRefObject } from "react";
import { render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import { NestedDialogContextProvider } from "../NestedDialogContext";
import { useNestedDialogFixes } from "../useNestedDialogFixes";

describe("useNestedDialogFixes", () => {
  it("should default to not disabling the overlay or the escape close functionality", () => {
    const options = {
      id: "dialog-id",
      visible: false,
      disabled: false,
      disableEscapeClose: false,
    };
    let { result } = renderHook(() => useNestedDialogFixes(options));

    expect(result.current).toEqual({
      disableOverlay: false,
      disableEscapeClose: false,
    });

    ({ result } = renderHook(() =>
      useNestedDialogFixes({ ...options, visible: true })
    ));

    expect(result.current).toEqual({
      disableOverlay: false,
      disableEscapeClose: false,
    });
  });

  it("should disable the overlay and escape close if there is a parent dialog", () => {
    type Result = MutableRefObject<
      | {
          disableOverlay: boolean;
          disableEscapeClose: boolean;
        }
      | undefined
    >;

    const firstResult: Result = { current: undefined };
    function First() {
      firstResult.current = useNestedDialogFixes({
        id: "dialog-1",
        visible: true,
        disabled: false,
        disableEscapeClose: false,
      });

      return null;
    }

    const secondResult: Result = { current: undefined };
    function Second() {
      secondResult.current = useNestedDialogFixes({
        id: "dialog-2",
        visible: true,
        disabled: false,
        disableEscapeClose: false,
      });

      return null;
    }

    function Test() {
      return (
        <NestedDialogContextProvider>
          <First />
          <Second />
        </NestedDialogContextProvider>
      );
    }

    render(<Test />);
    expect(firstResult.current).toEqual({
      disableOverlay: true,
      disableEscapeClose: true,
    });
    expect(secondResult.current).toEqual({
      disableOverlay: false,
      disableEscapeClose: false,
    });
  });

  it("should warn in a non-prod environment if trying to add multiple dialogs with the same id", () => {
    const { NODE_ENV } = process.env;
    process.env.NODE_ENV = "production";
    const warn = jest.spyOn(console, "warn");
    // hide warnings
    warn.mockImplementation(() => {});
    function Dialog() {
      useNestedDialogFixes({
        id: "dialog-id",
        visible: true,
        disabled: false,
        disableEscapeClose: false,
      });

      return null;
    }

    function Test() {
      return (
        <NestedDialogContextProvider>
          <Dialog />
          <Dialog />
        </NestedDialogContextProvider>
      );
    }

    const { unmount } = render(<Test />);
    unmount();
    expect(warn).not.toBeCalled();

    process.env.NODE_ENV = NODE_ENV;
    render(<Test />);
    expect(warn).toBeCalledTimes(3);
    expect(warn).toBeCalledWith(
      "Tried to add a duplicate dialog id to the `NestedDialogContext`."
    );
    expect(warn).toBeCalledWith(
      "This means that you have two dialogs with the same id: `dialog-id`."
    );
    expect(warn).toBeCalledWith(
      "This should be fixed before moving to production since this will break accessibility and is technically invalid."
    );

    warn.mockRestore();
  });
});
