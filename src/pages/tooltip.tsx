import { Button } from "@react-md/button";
import { Box } from "@react-md/core";
import {
  Tooltip,
  TooltipHoverModeProvider,
  useTooltip,
} from "@react-md/tooltip";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "src/components/DemoHeadingWithDivider";
import { Resettable } from "src/components/Resettable";

function SimpleExample(): ReactElement {
  const { elementProps, tooltipProps } = useTooltip({
    // hoverTime: 0,
  });

  return (
    <>
      <Button {...elementProps}>Button</Button>
      <Tooltip {...tooltipProps} disablePortal>
        This is a really long tooltip without breaks.
        WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
        Continue with more stuff.
      </Tooltip>
    </>
  );
}

export default function TooltipPage(): ReactElement {
  return (
    <Resettable>
      <TooltipHoverModeProvider>
        <Box stacked>
          <DemoHeadingWithDivider>Simple Example</DemoHeadingWithDivider>
          <SimpleExample />
          <SimpleExample />
          <SimpleExample />
        </Box>
      </TooltipHoverModeProvider>
    </Resettable>
  );
}
