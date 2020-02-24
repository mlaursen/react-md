import React, { forwardRef, HTMLAttributes, ReactElement, Ref } from "react";
import { cnb } from "cnbuilder";
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

function Snackbar(
  {
    className,
    children,
    portal = false,
    portalInto,
    portalIntoId,
    ...props
  }: SnackbarProps,
  ref?: Ref<HTMLDivElement>
): ReactElement {
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
        className={cnb(block(), className)}
      >
        {children}
      </div>
    </ConditionalPortal>
  );
}

const ForwardedSnackbar = forwardRef<HTMLDivElement, SnackbarProps>(Snackbar);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedSnackbar.propTypes = {
      id: PropTypes.string.isRequired,
      children: PropTypes.node,
      portal: PropTypes.bool,
    };
  } catch (e) {}
}

export default ForwardedSnackbar;
