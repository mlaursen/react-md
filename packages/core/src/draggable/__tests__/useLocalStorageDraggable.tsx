import { describe, expect, it } from "@jest/globals";
import { cnb } from "cnbuilder";
import type { ReactElement } from "react";
import { fireEvent, rmdRender } from "../../test-utils/index.js";

import { Button } from "../../button/Button.js";
import { getPercentage } from "../../utils/getPercentage.js";
import { useLocalStorageDraggable } from "../useLocalStorageDraggable.js";

describe("useLocalStorageDraggable", () => {
  it("should persist the value to local storage when a key is provided and the user is not dragging", () => {
    function Test(): ReactElement {
      const {
        value,
        dragging,
        draggableRef,
        mouseEventHandlers,
        touchEventHandlers,
        keyboardEventHandlers,
      } = useLocalStorageDraggable({
        min: 0,
        max: 100,
        key: "test",
      });

      const percentage = getPercentage({ min: 0, max: 100, value });

      return (
        <>
          <Button
            aria-valuenow={Math.ceil(percentage * 100)}
            ref={draggableRef}
            {...mouseEventHandlers}
            {...touchEventHandlers}
            {...keyboardEventHandlers}
            className={cnb(dragging && "dragging")}
          >
            Button
          </Button>
        </>
      );
    }
    const { getByRole } = rmdRender(<Test />);

    const button = getByRole("button");
    expect(localStorage.getItem("test")).toBe("50");

    fireEvent.mouseDown(button, { button: 0 });
    fireEvent.mouseMove(button);
    fireEvent.mouseMove(window, { clientX: 60 });
    expect(button).toHaveAttribute("aria-valuenow", "60");
    expect(localStorage.getItem("test")).toBe("50");

    fireEvent.mouseUp(window, { clientX: 60 });
    expect(button).toHaveAttribute("aria-valuenow", "60");
    expect(localStorage.getItem("test")).toBe("60");
  });
});
