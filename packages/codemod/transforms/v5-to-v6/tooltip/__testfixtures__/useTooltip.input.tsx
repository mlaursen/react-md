import { type ReactElement } from "react";
import { Button, Tooltip, useTooltip } from "react-md";

export default function Example(): ReactElement {
  const { elementProps, tooltipProps } = useTooltip({
    baseId: "example-1-id",
    onClick(event) {
      // DO SOMETHING
    },
    touchTime: 500,
    focusTime: 400,
    disableHoverMode: true,
  });
  return (
    <>
      <Button {...elementProps}>Button</Button>
      <Tooltip {...tooltipProps}>Tooltip</Tooltip>
    </>
  );
}
