"use client";
import { useCallback, useState, type Ref, type RefCallback } from "react";
import { useResizeObserver } from "../useResizeObserver.js";
import {
  useTooltip,
  type TooltipImplementation,
  type TooltipOptions,
} from "./useTooltip.js";

/**
 * @remarks \@since 6.0.0
 */
export interface OverflowTooltipOptions extends TooltipOptions {
  elementRef?: Ref<HTMLElement>;
}

/**
 * @remarks \@since 6.0.0
 */
export interface OverflowTooltipImplementation extends TooltipImplementation {
  nodeRef: RefCallback<HTMLElement>;
}

/**
 * This hook will ensure that a tooltip will only appear when text has
 * overflown by checking the size with the {@link useResizeObserver}.
 *
 * @example
 * ```tsx
 * import {
 *   cssUtils,
 *   Link,
 *   Tooltip,
 *   useOverflowTooltip,
 *   type LinkProps,
 * } from "@react-md/core";
 * import { type ReactElement } from "react";
 *
 * function NavigationLink(props: LinkProps): ReactElement {
 *   const { children, ...remaining } = props;
 *   const { nodeRef, elementProps, tooltipProps } = useOverflowTooltip(remaining);
 *
 *   return (
 *     <Link {...remaining} {...elementProps} style={{ width: "100%" }}>
 *       <span ref={nodeRef} className={cssUtils({ textOverflow: "ellipsis" })}>
 *         {children}
 *       </span>
 *       <Tooltip {...tooltipProps}>
 *         {children}
 *       </Tooltip>
 *     </Link>
 *   );
 * }
 *
 * function Example(): ReactElement {
 *   return (
 *     <div style={{ width: "10rem", overflow: "auto" }}>
 *       <NavigationLink href="/">Home</NavigationLink>
 *       <NavigationLink href="/some-path">
 *         Super long text that will be truncated with ellipsis and
 *         have a tooltip appear
 *       </NavigationLink>
 *     </div>
 *   );
 * }
 * ```
 *
 * @remarks \@since 6.0.0
 */
export function useOverflowTooltip(
  options: OverflowTooltipOptions = {}
): OverflowTooltipImplementation {
  const { disabled, elementRef, ...tooltipOptions } = options;
  const [overflown, setOverflown] = useState(false);
  const nodeRef = useResizeObserver({
    ref: elementRef,
    disableHeight: true,
    onUpdate: useCallback((entry) => {
      const target = entry.target as HTMLElement;
      setOverflown(target.offsetWidth < target.scrollWidth);
    }, []),
  });

  const implementation = useTooltip({
    ...tooltipOptions,
    disabled: !overflown || disabled,
  });

  return {
    nodeRef,
    ...implementation,
  };
}
