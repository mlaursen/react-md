import React, { forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import {
  ConditionalPortal,
  RenderConditionalPortalProps,
} from "@react-md/portal";
import { bem } from "@react-md/utils";

export interface SnackbarProps
  extends HTMLAttributes<HTMLDivElement>,
    RenderConditionalPortalProps {
  /**
   * The id for the snackbar element. This is required for a11y.
   */
  id: string;
}

const block = bem("rmd-snackbar");

const Snackbar = forwardRef<HTMLDivElement, SnackbarProps>(function Snackbar(
  { className, children, portal = false, portalInto, portalIntoId, ...props },
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
        className={cn(block(), className)}
      >
        {children}
      </div>
    </ConditionalPortal>
  );
});

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    Snackbar.propTypes = {
      id: PropTypes.string.isRequired,
      className: PropTypes.string,
      children: PropTypes.node,
      portal: PropTypes.bool,
      portalInto: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      portalIntoId: PropTypes.string,
    };
  } catch (e) {}
}

export default Snackbar;
