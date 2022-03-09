/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import cn from "classnames";
import type { RenderConditionalPortalProps } from "@react-md/portal";
import { ConditionalPortal } from "@react-md/portal";
import type { CSSTransitionComponentProps } from "@react-md/transition";
import { CSSTransition } from "@react-md/transition";
import { bem } from "@react-md/utils";

import {
  DEFAULT_OVERLAY_TIMEOUT,
  DEFAULT_OVERLAY_CLASSNAMES,
} from "./constants";

export interface OverlayProps
  extends HTMLAttributes<HTMLSpanElement>,
    CSSTransitionComponentProps,
    RenderConditionalPortalProps {
  /**
   * Boolean if the overlay is currently visible. When this prop changes, the
   * overlay will enter/exit with an opacity transition.
   */
  visible: boolean;

  /**
   * A function that should change the `visible` prop to `false`. This is used
   * so that clicking the overlay can hide the overlay.
   */
  onRequestClose(): void;

  /**
   * Boolean if the overlay should still be "hidden" from the user while
   * visible. This will just make it so the opacity stays at 0. This is really
   * just helpful if you'd like to create a simple close on outside click
   * feature since you can hook into the `onRequestClose` prop since the overlay
   * will be clicked.
   */
  hidden?: boolean;

  /**
   * Boolean if the overlay should gain the pointer cursor while it's visible.
   * You normally want this enabled by default except when used as a modal's
   * overlay.
   */
  clickable?: boolean;
}

const block = bem("rmd-overlay");

/**
 * The `Overlay` component is a simple component used to render a full page
 * overlay in the page with an enter and exit animation. If there are overflow
 * issues or you need to portal the overlay to a different area within your app,
 * you should use the `OverlayPortal` component instead.
 */
export const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  function Overlay(
    {
      className,
      visible,
      hidden = false,
      clickable = true,
      timeout = DEFAULT_OVERLAY_TIMEOUT,
      classNames = DEFAULT_OVERLAY_CLASSNAMES,
      children,
      temporary = true,
      onRequestClose,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      portal,
      portalInto,
      portalIntoId,
      tabIndex = -1,
      onClick,
      ...props
    },
    nodeRef
  ) {
    return (
      <ConditionalPortal
        portal={portal}
        portalInto={portalInto}
        portalIntoId={portalIntoId}
      >
        <CSSTransition
          appear
          nodeRef={nodeRef}
          transitionIn={visible}
          classNames={hidden ? "" : classNames}
          timeout={hidden ? 0 : timeout}
          temporary={temporary}
          onEnter={onEnter}
          onEntering={onEntering}
          onEntered={onEntered}
          onExit={onExit}
          onExiting={onExiting}
          onExited={onExited}
        >
          <span
            {...props}
            className={cn(
              block({
                visible,
                clickable,
              }),
              className
            )}
            onClick={(event) => {
              onClick?.(event);
              if (event.isPropagationStopped()) {
                return;
              }

              onRequestClose();
            }}
            tabIndex={tabIndex}
          >
            {children}
          </span>
        </CSSTransition>
      </ConditionalPortal>
    );
  }
);
