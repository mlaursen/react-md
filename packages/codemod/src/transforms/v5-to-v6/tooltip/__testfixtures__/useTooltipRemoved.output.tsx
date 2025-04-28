// TODO: `useTooltip` no longer returns the following keys from the hover mode api and must manually be updated: stuck, active, onClick, onMouseEnter, onMouseLeave
// TODO: `useTooltip` no longer returns the `handlers` object. The event handlers can be extracted from the `elementProps` if they are still needed.
import { type ReactElement } from "react";
import { Button, Tooltip, useTooltip, useTooltipHoverMode } from "react-md";

export default function Example(): ReactElement {
  const {
    enableHoverMode: enable,
    disableHoverMode,
    startDisableTimer
  } = useTooltipHoverMode();

  const {
    elementProps,
    tooltipProps,
    clearVisibilityTimeout: clearHoverTimeout
  } = useTooltip({
    id: "example-1-id",
    onClick(event) {
      // DO SOMETHING
    },
  });
  return (
    <>
      <Button {...elementProps}>Button</Button>
      <Tooltip {...tooltipProps}>Tooltip</Tooltip>
    </>
  );
}
