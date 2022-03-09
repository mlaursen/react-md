import type { ReactElement, ReactNode } from "react";
import { useCallback, useState } from "react";
import type { AppBarTitleProps } from "@react-md/app-bar";
import { AppBarTitle as RMDAppBarTitle } from "@react-md/app-bar";
import { Tooltip, useTooltip } from "@react-md/tooltip";
import { useResizeObserver } from "@react-md/utils";

import { useId } from "./IdProvider";

/**
 * This component is a wrapper for the AppBarTitle component from
 * \@react-md/app-bar that will automatically update the title to show a tooltip
 * if the title becomes truncated.
 *
 * This is pretty hacky right so it isn't part of the main lib yet, but a better
 * sultion to "auto tooltip" things might be added one day.
 */
export default function AppBarTitle({
  id,
  children,
  ...props
}: AppBarTitleProps): ReactElement {
  const [tooltip, setTooltip] = useState<ReactNode>(null);
  const updateTooltip = useCallback(
    ({ width, scrollWidth }) => {
      // the `width` is a `DOMRectReadOnly` object which allows for fractional
      // values while `scrollWidth` is always `Math.ceil` so to be able to
      // compare correctly, need to also `Math.ceil` the width or use
      // `target.offsetWidth`
      const offsetWidth = Math.ceil(width);
      const isTruncated = offsetWidth < scrollWidth;
      if (isTruncated && !tooltip) {
        setTooltip(children);
      } else if (!isTruncated && tooltip) {
        setTooltip(null);
      }
    },
    [tooltip, children]
  );
  const [, refHandler] = useResizeObserver(updateTooltip, {
    disableHeight: true,
  });
  const baseId = useId(id);
  const { elementProps, tooltipProps } = useTooltip({
    baseId,
  });

  return (
    <>
      <RMDAppBarTitle
        {...props}
        {...(tooltip ? elementProps : { id: baseId })}
        ref={refHandler}
        tabIndex={tooltip ? 0 : undefined}
      >
        {children}
      </RMDAppBarTitle>
      <Tooltip {...tooltipProps}>{tooltip}</Tooltip>
    </>
  );
}
