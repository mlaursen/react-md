import React, { FunctionComponent, ReactNode, ReactElement } from "react";
import {
  ITooltipConfig,
  TooltipPositionOrAuto,
  MergableTooltipHandlers,
} from "./types.d";
import { useTooltipState } from "./hooks";
import TooltipBase from "./TooltipBase";

// export type TooltippedChildrenRenderer = (
//   config: ITooltipState & { handlers: MergableTooltipHandlers }
// ) => ReactElement<any>;
export type TooltippedChildrenRenderer = (config: {
  tooltip: ReactNode;
  containerProps?: MergableTooltipHandlers & {
    "aria-describedby"?: string;
  };
}) => ReactElement<any>;
export interface ITooltippedProps extends Partial<ITooltipConfig> {
  id: string;
  tooltip?: ReactNode;
  tooltipId?: string;
}

interface ITooltippedWithChildrenProps extends ITooltippedProps {
  children: TooltippedChildrenRenderer;
}

interface ITooltippedDefaultProps {
  dense: boolean;
  hoverDelay: number;
  focusDelay: number;
  vhMargin: number;
  vwMargin: number;
  spacing: number | string;
  denseSpacing: number | string;
  defaultVisible: boolean;
  defaultPosition: TooltipPositionOrAuto;
}

type TooltippedWithDefaultProps = ITooltippedWithChildrenProps &
  ITooltippedDefaultProps;

const Tooltipped: FunctionComponent<ITooltippedWithChildrenProps> = props => {
  const { children, tooltip: tooltipChildren } = props;
  if (!tooltipChildren) {
    return children({ tooltip: null });
  }

  let { tooltipId } = props;
  if (!tooltipId) {
    tooltipId = `${props.id}-tooltip`;
  }

  const { visible, position, handlers } = useTooltipState(
    props as TooltippedWithDefaultProps
  );
  const tooltip = (
    <TooltipBase id={tooltipId} visible={visible} position={position}>
      {tooltipChildren}
    </TooltipBase>
  );

  return children({
    tooltip,
    containerProps: { "aria-describedby": tooltipId, ...handlers },
  });
};

const defaultProps: ITooltippedDefaultProps = {
  dense: false,
  hoverDelay: 1000,
  focusDelay: 1000,
  vhMargin: 0.32,
  vwMargin: 0.32,
  spacing: "1.5rem",
  denseSpacing: "0.875rem",
  defaultVisible: false,
  defaultPosition: "auto",
};
Tooltipped.defaultProps = defaultProps;

export default Tooltipped;
