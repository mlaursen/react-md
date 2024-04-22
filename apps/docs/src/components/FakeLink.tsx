"use client";
import { Tooltip } from "@react-md/core/tooltip/Tooltip";
import { useTooltip } from "@react-md/core/tooltip/useTooltip";
import { forwardRef, type AnchorHTMLAttributes } from "react";

export interface FakeLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export const FakeLink = forwardRef<HTMLAnchorElement, FakeLinkProps>(
  function HashLink(props, ref) {
    const { href, ...remaining } = props;
    const { elementProps, tooltipProps } = useTooltip({
      ...props,
      hoverTimeout: 0,
      defaultPosition: "right",
    });

    return (
      <>
        <span {...remaining} {...elementProps} ref={ref} />
        <Tooltip {...tooltipProps}>href: {href}</Tooltip>
      </>
    );
  }
);
