import { cnb } from "cnbuilder";
import type { ReactElement } from "react";
import { useState } from "react";
import { fireEvent, rmdRender } from "../../test-utils";

import { Button } from "../../button/Button";
import { getPercentage } from "../../utils/getPercentage";
import { useControlledDraggable } from "../useControlledDraggable";

describe("useControlledDraggable", () => {
  it("should allow for the value to be controlled", () => {
    function Test(): ReactElement {
      const [value, setValue] = useState(20);
      const [dragging, setDragging] = useState(false);

      const {
        draggableRef,
        keyboardEventHandlers,
        minimum,
        maximum,
        increment,
        decrement,
      } = useControlledDraggable({
        min: 0,
        max: 100,
        dragging,
        setValue,
        setDragging,
      });

      const percentage = getPercentage({ min: 0, max: 100, value });

      return (
        <>
          <Button
            aria-valuenow={Math.ceil(percentage * 100)}
            ref={draggableRef}
            {...keyboardEventHandlers}
            className={cnb(dragging && "dragging")}
          >
            Button
          </Button>
          <Button onClick={minimum}>Minimum</Button>
          <Button onClick={maximum}>Maximum</Button>
          <Button onClick={increment}>Increment</Button>
          <Button onClick={decrement}>Decrement</Button>
        </>
      );
    }

    const { getByRole } = rmdRender(<Test />);

    const button = getByRole("button", { name: "Button" });
    const minimum = getByRole("button", { name: "Minimum" });
    const maximum = getByRole("button", { name: "Maximum" });
    const increment = getByRole("button", { name: "Increment" });
    const decrement = getByRole("button", { name: "Decrement" });
    expect(button).toMatchSnapshot();
    expect(button).toHaveAttribute("aria-valuenow", "20");

    fireEvent.click(increment);
    expect(button).toHaveAttribute("aria-valuenow", "21");

    fireEvent.click(decrement);
    expect(button).toHaveAttribute("aria-valuenow", "20");

    fireEvent.click(minimum);
    expect(button).toHaveAttribute("aria-valuenow", "0");
    fireEvent.click(maximum);
    expect(button).toHaveAttribute("aria-valuenow", "100");
  });
});
