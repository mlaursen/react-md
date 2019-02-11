import React, {
  FunctionComponent,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from "react";
import cn from "classnames";

import {
  ConditionalPortal,
  IRenderConditionalPortalProps,
} from "@react-md/portal";
import { Omit } from "@react-md/utils";

import { useTooltipState } from "./hooks";
import Tooltip, { ITooltipProps } from "./Tooltip";
import {
  ITooltipConfig,
  MergableTooltipHandlers,
  TooltipPositionOrAuto,
} from "./types.d";

export type TooltippedChildrenRenderer = (config: {
  tooltip: ReactNode;
  containerProps?: MergableTooltipHandlers & {
    id: string;
    "aria-describedby"?: string;
  };
}) => ReactElement<any>;

export interface ITooltippedProps
  extends Partial<ITooltipConfig>,
    IRenderConditionalPortalProps,
    Omit<ITooltipProps, keyof HTMLAttributes<HTMLSpanElement> | "visible"> {
  id: string;
  tooltip?: ReactNode;
  tooltipId?: string;
  className?: string;
}

type TooltippedProps = ITooltippedProps & {
  children: TooltippedChildrenRenderer;
};

interface ITooltippedDefaultProps {
  portal: boolean;
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

type TooltippedWithDefaultProps = TooltippedProps & ITooltippedDefaultProps;

const Tooltipped: FunctionComponent<TooltippedProps> = providedProps => {
  const props = providedProps as TooltippedWithDefaultProps;
  const {
    id,
    className,
    children,
    tooltip: tooltipChildren,
    vhMargin,
    vwMargin,
    hoverDelay,
    focusDelay,
    spacing,
    denseSpacing,
    defaultVisible,
    defaultPosition,
    portal,
    portalInto,
    portalIntoId,
    ...tooltipProps
  } = props;
  if (!tooltipChildren) {
    return children({ tooltip: null });
  }

  let { tooltipId } = props;
  if (!tooltipId) {
    tooltipId = `${id}-tooltip`;
  }

  const {
    visible,
    position,
    tooltipHandlers,
    containerHandlers,
  } = useTooltipState(props);

  const tooltip = (
    <ConditionalPortal
      portal={portal}
      portalInto={portalInto}
      portalIntoId={portalIntoId}
      visible={visible}
    >
      <Tooltip
        id={tooltipId}
        {...tooltipProps}
        {...tooltipHandlers}
        className={cn(
          { "rmd-tooltip--portal": portal || portalInto || portalIntoId },
          className
        )}
        visible={visible}
        position={position}
      >
        {tooltipChildren}
      </Tooltip>
    </ConditionalPortal>
  );

  return children({
    tooltip,
    containerProps: { id, "aria-describedby": tooltipId, ...containerHandlers },
  });
};

const defaultProps: ITooltippedDefaultProps = {
  portal: false,
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
