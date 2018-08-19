import * as React from "react";
import { Button, IButtonProps } from "@react-md/button";
import { RelativeTooltip, ITooltipOptions, TooltipPosition } from "@react-md/tooltip";

import { ExampleTitle } from "components/ExamplesPage";

interface IButtonWithTooltipProps extends IButtonProps, ITooltipOptions {
  id: string;
  tooltip: React.ReactNode;
  tooltipStyle?: React.CSSProperties;
}

const LongTooltip: React.SFC<{}> = () => (
  <span>
    This is going to be a long tooltip that will eventually line-wrap. To get this to work, you should also apply a
    manual <code>width</code> to the tooltip, otherwise it will start line-wrapping based on the width of its container
    element.
  </span>
);

const ButtonWithTooltip: React.SFC<IButtonWithTooltipProps> = ({
  id,
  tooltip,
  children,
  dense,
  lineWrap,
  position,
  tooltipStyle,
  ...props
}) => {
  const tooltipId = `${id}-tooltip`;

  return (
    <Button id={id} aria-describedby={tooltipId} {...props}>
      {children}
      <RelativeTooltip id={tooltipId} dense={dense} lineWrap={lineWrap} position={position} style={tooltipStyle}>
        {tooltip}
      </RelativeTooltip>
    </Button>
  );
};

const RelativeTooltips = () => (
  <React.Fragment>
    <ExampleTitle>Tooltip Positions</ExampleTitle>
    <ButtonWithTooltip
      id="button-1"
      tooltip="Tooltip Top"
      position={TooltipPosition.TOP}
      className="example-group__example"
    >
      Button
    </ButtonWithTooltip>
    <ButtonWithTooltip
      id="button-2"
      tooltip="Tooltip Right"
      position={TooltipPosition.RIGHT}
      className="example-group__example"
    >
      Button
    </ButtonWithTooltip>
    <ButtonWithTooltip
      id="button-3"
      tooltip="Tooltip Bottom"
      position={TooltipPosition.BOTTOM}
      className="example-group__example"
    >
      Button
    </ButtonWithTooltip>
    <ButtonWithTooltip
      id="button-4"
      tooltip="Tooltip Left"
      position={TooltipPosition.LEFT}
      className="example-group__example"
    >
      Button
    </ButtonWithTooltip>
    <ExampleTitle>Tooltip dense</ExampleTitle>
    <ButtonWithTooltip
      id="button-5"
      tooltip="Tooltip Top"
      position={TooltipPosition.TOP}
      dense={true}
      className="example-group__example"
    >
      Button
    </ButtonWithTooltip>
    <ButtonWithTooltip
      id="button-6"
      tooltip="Tooltip Right"
      position={TooltipPosition.RIGHT}
      dense={true}
      className="example-group__example"
    >
      Button
    </ButtonWithTooltip>
    <ButtonWithTooltip
      id="button-7"
      tooltip="Tooltip Bottom"
      position={TooltipPosition.BOTTOM}
      dense={true}
      className="example-group__example"
    >
      Button
    </ButtonWithTooltip>
    <ButtonWithTooltip
      id="button-8"
      tooltip="Tooltip Left"
      position={TooltipPosition.LEFT}
      dense={true}
      className="example-group__example"
    >
      Button
    </ButtonWithTooltip>
    <ExampleTitle>Tooltip with line wrapping</ExampleTitle>
    <ButtonWithTooltip
      id="button-9"
      tooltip={<LongTooltip />}
      dense={true}
      lineWrap={true}
      className="example-group__example"
    >
      No Additional Styles
    </ButtonWithTooltip>
    <ButtonWithTooltip
      id="button-10"
      tooltip={<LongTooltip />}
      dense={true}
      lineWrap={true}
      className="example-group__example"
      tooltipStyle={{ width: 400 }}
    >
      With Additional Styles
    </ButtonWithTooltip>
  </React.Fragment>
);

export default RelativeTooltips;
