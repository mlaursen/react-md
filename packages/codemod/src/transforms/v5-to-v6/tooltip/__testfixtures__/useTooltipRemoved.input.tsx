import { type ReactElement } from "react";
import { Button, Tooltip, useTooltip } from "react-md";

export default function Example(): ReactElement {
  const {
    elementProps,
    tooltipProps,
    stuck,
    active,
    onClick,
    onMouseEnter,
    onMouseLeave,
    handlers,
    enableHoverMode: enable,
    disableHoverMode,
    startDisableTimer,
    clearHoverTimeout,
  } = useTooltip({
    baseId: "example-1-id",
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
