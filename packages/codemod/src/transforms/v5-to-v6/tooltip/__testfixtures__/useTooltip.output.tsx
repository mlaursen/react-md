// TODO: `useTooltip` no longer supports the `disableHoverMode` option and was removed. See the new hover mode API docs or define the `hoverTimeout` to option.
import { type ReactElement } from "react";
import { Button, Tooltip, useTooltip } from "react-md";

export default function Example(): ReactElement {
  const { elementProps, tooltipProps } = useTooltip({
    id: "example-1-id",

    onClick(event) {
      // DO SOMETHING
    },

    hoverTimeout: 400
  });
  return (
    <>
      <Button {...elementProps}>Button</Button>
      <Tooltip {...tooltipProps}>Tooltip</Tooltip>
    </>
  );
}
