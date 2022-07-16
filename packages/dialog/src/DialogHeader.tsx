import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import { dialogHeader } from "./styles";

export type DialogHeaderProps = HTMLAttributes<HTMLDivElement>;

export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  function DialogHeader(props, ref) {
    const { children, className, ...remaining } = props;

    return (
      <div {...remaining} ref={ref} className={dialogHeader({ className })}>
        {children}
      </div>
    );
  }
);
