import React, { FunctionComponent, forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

export interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * An optional alignment for the content within the footer. Since the majority of dialog
   * footers are used to contain action buttons, the default alignment is near the end.
   */
  align?:
    | "none"
    | "start"
    | "end"
    | "between"
    | "stacked-start"
    | "stacked-end";
}

type WithRef = WithForwardedRef<HTMLDivElement>;
type DefaultProps = Required<Pick<DialogFooterProps, "align">>;
type WithDefaultProps = DialogFooterProps & DefaultProps & WithRef;

const block = bem("rmd-dialog");

const DialogFooter: FunctionComponent<
  DialogFooterProps & WithRef
> = providedProps => {
  const {
    children,
    className,
    forwardedRef,
    align,
    ...props
  } = providedProps as WithDefaultProps;

  return (
    <footer
      {...props}
      className={cn(
        block("footer", {
          flex: align !== "none",
          [align]: align !== "none",
        }),
        className
      )}
      ref={forwardedRef}
    >
      {children}
    </footer>
  );
};

const defaultProps: DefaultProps = {
  align: "end",
};

DialogFooter.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  DialogFooter.displayName = "DialogFooter";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    DialogFooter.propTypes = {
      className: PropTypes.string,
      children: PropTypes.node,
      align: PropTypes.oneOf([
        "none",
        "start",
        "end",
        "between",
        "stacked-start",
        "stacked-end",
      ]),
    };
  }
}

export default forwardRef<HTMLDivElement, DialogFooterProps>((props, ref) => (
  <DialogFooter {...props} forwardedRef={ref} />
));
