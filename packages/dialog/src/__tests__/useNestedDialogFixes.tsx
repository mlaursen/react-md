import React, { FunctionComponent, MutableRefObject } from "react";
import { cleanup, render } from "react-testing-library";
import { renderHook } from "react-hooks-testing-library";

import useNestedDialogFixes from "../useNestedDialogFixes";
import { NestedDialogContextProvider } from "../NestedDialogContext";

afterEach(cleanup);

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
    const First: FunctionComponent = () => {
      firstResult.current = useNestedDialogFixes({
        id: "dialog-1",
        visible: true,
        disabled: false,
        disableEscapeClose: false,
      });

      return null;
    };

    const secondResult: Result = { current: undefined };
    const Second: FunctionComponent = () => {
      secondResult.current = useNestedDialogFixes({
        id: "dialog-2",
        visible: true,
        disabled: false,
        disableEscapeClose: false,
      });

      return null;
    };

    const Test = () => (
      <NestedDialogContextProvider>
        <First />
        <Second />
      </NestedDialogContextProvider>
    );

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
});
