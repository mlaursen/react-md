import React, { FC, HTMLAttributes, forwardRef } from "react";
import cn from "classnames";
import {
  ConditionalPortal,
  RenderConditionalPortalProps,
} from "@react-md/portal";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

export interface SnackbarProps
  extends HTMLAttributes<HTMLDivElement>,
    RenderConditionalPortalProps {
  /**
   * The id for the snackbar element. This is required for a11y.
   */
  id: string;
}

type WithRef = WithForwardedRef<HTMLDivElement>;
type DefaultProps = Required<Pick<SnackbarProps, "portal">>;
type WithDefaultProps = SnackbarProps & WithRef & DefaultProps;

const block = bem("rmd-snackbar");

const Snackbar: FC<SnackbarProps & WithRef> = providedProps => {
  const {
    className,
    forwardedRef,
    children,
    portal,
    portalInto,
    portalIntoId,
    ...props
  } = providedProps as WithDefaultProps;

  return (
    <ConditionalPortal
      portal={portal}
      portalInto={portalInto}
      portalIntoId={portalIntoId}
    >
      <div
        {...props}
        role="status"
        ref={forwardedRef}
        className={cn(block(), className)}
      >
        {children}
      </div>
    </ConditionalPortal>
  );
};

const defaultProps: DefaultProps = {
  portal: false,
};

Snackbar.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  Snackbar.displayName = "Snackbar";

  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    Snackbar.propTypes = {
      id: PropTypes.string.isRequired,
      children: PropTypes.node,
      portal: PropTypes.bool,
    };
  }
}

export default forwardRef<HTMLDivElement, SnackbarProps>((props, ref) => (
  <Snackbar {...props} forwardedRef={ref} />
));
