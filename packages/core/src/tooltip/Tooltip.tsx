"use client";

import { type HTMLAttributes, type ReactElement, type Ref } from "react";

import { Portal } from "../portal/Portal.js";
import {
  type CSSTransitionClassNames,
  type CSSTransitionComponentProps,
  type SSRTransitionOptions,
  type TransitionActions,
  type TransitionTimeout,
} from "../transition/types.js";
import { useCSSTransition } from "../transition/useCSSTransition.js";
import { useEnsuredId } from "../useEnsuredId.js";
import {
  DEFAULT_TOOLTIP_CLASSNAMES,
  DEFAULT_TOOLTIP_POSITION,
  DEFAULT_TOOLTIP_TIMEOUT,
} from "./constants.js";
import { type TooltipClassNameOptions, tooltip } from "./styles.js";

/**
 * The base props for the `Tooltip` component. This can be extended when
 * creating custom tooltip implementations.
 *
 * @since 2.8.0 Supports the `RenderConditionalPortalProps`
 * @since 6.0.0 The `id` prop is optional.
 * @since 6.0.0 Removed `lineWrap` for `textOverflow`
 * @since 6.0.0 No longer supports the `RenderConditionalPortalProps` other than
 * `portal` with the `disablePortal` prop.
 * @since 6.3.1 Extends TooltipClassNameOptions for CSSProperties module
 * augmentation.
 */
export interface TooltipProps
  extends
    HTMLAttributes<HTMLSpanElement>,
    TooltipClassNameOptions,
    CSSTransitionComponentProps,
    SSRTransitionOptions,
    TransitionActions {
  ref?: Ref<HTMLSpanElement>;
  visible: boolean;

  /**
   * @see {@link CSSTransitionComponentProps.temporary}
   * @defaultValue `true`
   */
  temporary?: boolean;

  /**
   * @see {@link CSSTransitionComponentProps.timeout}
   * @defaultValue `DEFAULT_TOOLTIP_TIMEOUT`
   */
  timeout?: TransitionTimeout;

  /**
   * @see {@link CSSTransitionComponentProps.classNames}
   * @defaultValue `DEFAULT_TOOLTIP_CLASSNAMES`
   */
  classNames?: CSSTransitionClassNames;
}

/**
 * **Client Component**
 *
 * This is the base tooltip component that can only be used to render a tooltip
 * with an animation when the visibility changes. If this component is used, you
 * will need to manually add all the event listeners and triggers to change the
 * `visible` prop.
 *
 * @example Simple Usage
 * ```tsx
 * import { Button } from "@react-md/core/button/Button";
 * import { Tooltip } from "@react-md/core/tooltip/Tooltip";
 * import { useTooltip } from "@react-md/core/tooltip/useTooltip";
 *
 * function Example() {
 *   const { elementProps, tooltipProps } = useTooltip();
 *
 *   return (
 *     <>
 *       <Button {...elementProps}>Button</Button>
 *       <Tooltip {...tooltipProps}>
 *         Tooltip Content
 *       </Tooltip>
 *     </>
 *   );
 * }
 * ```
 *
 * @see {@link https://react-md.dev/components/tooltip | Tooltip Demos}
 */
export function Tooltip(props: TooltipProps): ReactElement {
  const {
    id: propId,
    ref: nodeRef,
    dense,
    visible,
    children,
    appear,
    enter,
    exit,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    timeout = DEFAULT_TOOLTIP_TIMEOUT,
    classNames = DEFAULT_TOOLTIP_CLASSNAMES,
    className,
    position = DEFAULT_TOOLTIP_POSITION,
    temporary = true,
    exitedHidden = !temporary,
    textOverflow,
    disablePortal: propDisablePortal,
    ...remaining
  } = props;
  const id = useEnsuredId(propId, "tooltip");

  const { rendered, elementProps, disablePortal } = useCSSTransition({
    nodeRef,
    appear,
    enter,
    exit,
    transitionIn: visible,
    timeout,
    classNames,
    className: tooltip({
      dense,
      position,
      className,
      textOverflow,
    }),
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    temporary,
    exitedHidden,
    disablePortal: propDisablePortal,
  });

  return (
    <Portal disabled={disablePortal}>
      {rendered && (
        <span {...remaining} {...elementProps} id={id} role="tooltip">
          {children}
        </span>
      )}
    </Portal>
  );
}
