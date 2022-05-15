import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

export type DialogTitleProps = HTMLAttributes<HTMLHeadingElement>;

const block = bem("rmd-dialog");

/**
 * This component adds some base styles to an `<h2>` element for a title within
 * a `Dialog`.
 */
export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  function DialogTitle({ children, className, ...props }, ref) {
    return (
      <h2 {...props} ref={ref} className={cn(block("title"), className)}>
        {children}
      </h2>
    );
  }
);
