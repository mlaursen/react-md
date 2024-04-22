"use client";
import { Tooltip } from "@react-md/core/tooltip/Tooltip";
import { useTooltip } from "@react-md/core/tooltip/useTooltip";
import { forwardRef, type AnchorHTMLAttributes } from "react";

export interface FakeLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export const FakeLink = forwardRef<HTMLAnchorElement, FakeLinkProps>(
  function HashLink(props, _ref) {
    const { href, ...remaining } = props;
    const { elementProps, tooltipProps } = useTooltip({
      ...props,
      hoverTimeout: 0,
      defaultPosition: "right",
    });

    // do not forward the ref so the link is not scrolled into view for demos
    // since it scrolls the entire page instead of a navigation panel
    return (
      <>
        <span {...remaining} {...elementProps} />
        <Tooltip {...tooltipProps}>href: {href}</Tooltip>
      </>
    );
  }
);
