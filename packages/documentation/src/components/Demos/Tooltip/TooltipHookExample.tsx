import { ReactElement } from "react";
import { Button } from "@react-md/button";
import { Tooltip, useTooltip } from "@react-md/tooltip";

export default function TooltipHookExample(): ReactElement {
  const { tooltipProps, elementProps } = useTooltip({
    baseId: "my-element-id",
  });

  return (
    <>
      <Button {...elementProps}>Button</Button>
      <Tooltip {...tooltipProps}>Toolip Content</Tooltip>
    </>
  );
}
