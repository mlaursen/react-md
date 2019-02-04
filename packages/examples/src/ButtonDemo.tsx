import React, { FunctionComponent, ReactNode } from "react";
import { Button, IButtonProps } from "@react-md/button";
import { TextContainer, Text } from "@react-md/typography";
import {
  useTooltipState,
  TooltipBase,
  ITooltipConfig,
  TooltipPositionOrAuto,
  ITooltippedProps,
  Tooltipped,
} from "@react-md/tooltip";
import { omit } from "@react-md/utils";

// interface IButtonWithTooltipProps
//   extends IButtonProps,
//     Partial<ITooltipConfig<HTMLButtonElement>> {
//   id: string;
//   tooltip?: ReactNode;
// }

// interface IButtonWithTooltipDefaultProps {
//   dense: boolean;
//   hoverDelay: number;
//   focusDelay: number;
//   vhMargin: number;
//   vwMargin: number;
//   spacing: number | string;
//   denseSpacing: number | string;
//   defaultVisible: boolean;
//   defaultPosition: TooltipPositionOrAuto;
// }
// type ButtonWithTooltipDefaultProps = IButtonWithTooltipProps &
//   IButtonWithTooltipDefaultProps;
// const ButtonWithTooltip: FunctionComponent<
//   IButtonWithTooltipProps
// > = providedProps => {
//   const {
//     tooltip,
//     dense,
//     hoverDelay,
//     focusDelay,
//     vhMargin,
//     vwMargin,
//     spacing,
//     denseSpacing,
//     defaultVisible,
//     defaultPosition,
//     children,
//     ...props
//   } = providedProps as ButtonWithTooltipDefaultProps;
//   let tooltipNode;
//   let handlers;
//   if (tooltip) {
//     const { visible, position, handlers: eventHandlers } = useTooltipState(
//       providedProps as ButtonWithTooltipDefaultProps
//     );

//     handlers = eventHandlers;

//     tooltipNode = (
//       <TooltipBase
//         id={`${props.id}-tooltip`}
//         visible={visible}
//         position={position}
//       >
//         {tooltip}
//       </TooltipBase>
//     );
//   }

//   return (
//     <Button {...props} {...handlers}>
//       {children}
//       {tooltipNode}
//     </Button>
//   );
// };

// const defaultProps: IButtonWithTooltipDefaultProps = {
//   dense: false,
//   hoverDelay: 1000,
//   focusDelay: 1000,
//   vhMargin: 0.32,
//   vwMargin: 0.32,
//   spacing: "1.5rem",
//   denseSpacing: "0.875rem",
//   defaultVisible: false,
//   defaultPosition: "auto",
// };
// ButtonWithTooltip.defaultProps = defaultProps;

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
    <Tooltipped {...props}>
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
      <Text type="headline-3">Avatar Demo</Text>
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
