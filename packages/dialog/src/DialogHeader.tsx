import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import { getDialogHeaderClassName } from "./styles";

export type DialogHeaderProps = HTMLAttributes<HTMLDivElement>;

export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  function DialogHeader(props, ref) {
    const { children, className, ...remaining } = props;

    return (
      <div
        {...remaining}
        ref={ref}
        className={getDialogHeaderClassName({ className })}
      >
        {children}
      </div>
    );
  }
);
