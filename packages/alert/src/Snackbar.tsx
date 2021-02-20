import React, { forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import {
  ConditionalPortal,
  RenderConditionalPortalProps,
} from "@react-md/portal";
import { bem } from "@react-md/utils";

export type SnackbarPosition = "bottom" | "top";

export interface SnackbarProps
  extends HTMLAttributes<HTMLDivElement>,
    RenderConditionalPortalProps {
  /**
   * The id for the snackbar element. This is required for a11y.
   */
  id: string;

  /**
   * The position for the snackbar to be fixed within the viewport or a
   * container element.
   */
  position?: SnackbarPosition;
}

const block = bem("rmd-snackbar");

export const Snackbar = forwardRef<HTMLDivElement, SnackbarProps>(
  function Snackbar(
    {
      className,
      children,
      portal = false,
      portalInto,
      portalIntoId,
      position = "bottom",
      ...props
    },
    ref
  ) {
    return (
      <ConditionalPortal
        portal={portal}
        portalInto={portalInto}
        portalIntoId={portalIntoId}
      >
        <div
          {...props}
          role="status"
          ref={ref}
          className={cn(block({ [position]: true }), className)}
        >
          {children}
        </div>
      </ConditionalPortal>
    );
  }
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    Snackbar.propTypes = {
      id: PropTypes.string.isRequired,
      className: PropTypes.string,
      children: PropTypes.node,
      position: PropTypes.oneOf(["bottom", "top"]),
      portal: PropTypes.bool,
      portalInto: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      portalIntoId: PropTypes.string,
    };
  } catch (e) {}
}
