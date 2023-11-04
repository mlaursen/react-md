import {
  Button,
  SrOnly,
  Tooltip,
  useTooltip,
  type ButtonProps,
  type TooltipOptions,
} from "@react-md/core";
import { type ReactElement, type ReactNode } from "react";

export interface IconButtonProps extends ButtonProps {
  label: ReactNode;
  tooltip?: ReactNode;
  tooltipOptions?: TooltipOptions;
}

export function IconButton(props: IconButtonProps): ReactElement {
  const { label, tooltip, tooltipOptions, children, ...remaining } = props;
  const { elementProps, tooltipProps } = useTooltip(tooltipOptions);

  return (
    <>
      <Button buttonType="icon" {...remaining} {...elementProps}>
        <SrOnly>{label}</SrOnly>
        {children}
      </Button>
      <Tooltip {...tooltipProps}>{tooltip ?? label}</Tooltip>
    </>
  );
}
