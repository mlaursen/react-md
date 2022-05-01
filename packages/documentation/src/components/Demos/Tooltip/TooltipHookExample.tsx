import type { ReactElement } from "react";
import { Button } from "@react-md/button";
import { Tooltip, useTooltip } from "@react-md/tooltip";

export default function TooltipHookExample(): ReactElement {
  const { tooltipProps, elementProps } = useTooltip({
    baseId: "my-element-id",
    onClick: (_event) => {
      // if the button has a custom click event, it should be set here
    },
  });

  return (
    <>
      <Button {...elementProps}>Button</Button>
      <Tooltip {...tooltipProps}>Tooltip Content</Tooltip>
    </>
  );
}
