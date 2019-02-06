import React, { FunctionComponent, ReactNode } from "react";
import { Button, IButtonProps } from "@react-md/button";
import { TextContainer, Text } from "@react-md/typography";
import {
  useTooltipState,
  ITooltipConfig,
  TooltipPositionOrAuto,
  ITooltippedProps,
  Tooltipped,
} from "@react-md/tooltip";
import { omit, Omit } from "@react-md/utils";

const ButtonWithTooltip: FunctionComponent<IButtonProps & ITooltippedProps> = ({
  children,
  ...props
}) => {
  const buttonProps = omit(props, [
    "tooltip",
    "tooltipId",
    "dense",
    "hoverDelay",
    "focusDelay",
    "vhMargin",
    "vwMargin",
    "spacing",
    "denseSpacing",
    "defaultVisible",
    "defaultPosition",
  ]);

  return (
    <Tooltipped {...props} portal>
      {({ tooltip, containerProps }) => (
        <Button {...buttonProps} {...containerProps}>
          {children}
          {tooltip}
        </Button>
      )}
    </Tooltipped>
  );
};
const ButtonDemo: FunctionComponent = () => {
  return (
    <TextContainer>
      <Text type="headline-3">Button Demo</Text>
      <div className="flex-grid flex-grid--spaced">
        <ButtonWithTooltip id="button-1" tooltip="Tooltip 1 Button">
          Button 1
        </ButtonWithTooltip>
        <ButtonWithTooltip id="button-2" tooltip="Tooltip 2 Button">
          Button 2
        </ButtonWithTooltip>
      </div>
    </TextContainer>
  );
};

export default ButtonDemo;
