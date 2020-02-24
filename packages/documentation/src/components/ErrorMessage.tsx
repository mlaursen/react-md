import React, { HTMLAttributes, forwardRef, Ref, ReactElement } from "react";
import { cnb } from "cnbuilder";
import { bem } from "@react-md/utils";

import "./ErrorMessage.scss";

export interface ErrorMessageProps extends HTMLAttributes<HTMLSpanElement> {
  id: string;
  twoLines?: boolean;
}

const block = bem("error-message");

/**
 * Simple error message component that needs a bit more work -- eventually will
 * be moved into the `@react-md/form` package.
 */
function ErrorMessage(
  { className, children, twoLines = false, ...props }: ErrorMessageProps,
  ref?: Ref<HTMLSpanElement>
): ReactElement {
  return (
    <span
      {...props}
      ref={ref}
      aria-live="polite"
      className={cnb(block({ "two-lines": twoLines }), className)}
    >
      {children}
    </span>
  );
}

const ForwardedErrorMessage = forwardRef<HTMLSpanElement, ErrorMessageProps>(
  ErrorMessage
);

export default ForwardedErrorMessage;
