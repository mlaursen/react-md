import { useState } from "react";
import {
  type DraggableImplementation,
  type DraggableOptions,
  useDraggable,
} from "../draggable/useDraggable.js";
import { withinRange } from "../utils/withinRange.js";

type SliderDraggableOptions = Pick<
  Required<DraggableOptions>,
  | "ref"
  | "min"
  | "max"
  | "step"
  | "value"
  | "setValue"
  | "disabled"
  | "vertical"
> &
  Pick<DraggableOptions, "rangeMin" | "rangeMax"> & {
    jump: number;
  };

/**
 * @internal
 */
export function useSliderDraggable(
  options: SliderDraggableOptions
): DraggableImplementation {
  const { value, setValue, jump, ...remaining } = options;
  const { min, max } = options;
  const [dragging, setDragging] = useState(false);
  const draggable = useDraggable({
    ...remaining,
    withinOffsetParent: true,
    disableDraggingCursorClassName: true,
    dragging,
    setDragging,
    value,
    setValue,
    onKeyDown(event) {
      switch (event.key) {
        case "PageUp":
          event.preventDefault();
          event.stopPropagation();
          setValue((prevValue) =>
            withinRange({
              min,
              max,
              value: prevValue + jump,
            })
          );
          break;
        case "PageDown":
          event.preventDefault();
          event.stopPropagation();
          setValue((prevValue) =>
            withinRange({
              min,
              max,
              value: prevValue - jump,
            })
          );
          break;
      }
    },
  });

  return draggable;
}
