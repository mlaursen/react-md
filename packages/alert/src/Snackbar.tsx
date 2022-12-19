import { bem, Portal, useEnsuredId } from "@react-md/core";
import { cnb } from "cnbuilder";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

const styles = bem("rmd-snackbar");

export interface SnackbarClassNameOptions {
  className?: string;
  position: SnackbarPosition;
}

function snackbar(options: SnackbarClassNameOptions): string {
  const { className, position } = options;

  return cnb(styles({ [position]: true }), className);
}

export type SnackbarPosition = "bottom" | "top";
export interface SnackbarProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  position?: SnackbarPosition;
  disablePortal?: boolean;
}

export const Snackbar = forwardRef<HTMLDivElement, SnackbarProps>(
  function Snackbar(props, ref) {
    const {
      id: propId,
      role = "status",
      className,
      position = "bottom",
      disablePortal,
      children,
      ...remaining
    } = props;
    const id = useEnsuredId(propId, "snackbar");
    return (
      <Portal disabled={disablePortal}>
        <div
          {...remaining}
          id={id}
          ref={ref}
          role={role}
          className={snackbar({ position, className })}
        >
          {children}
        </div>
      </Portal>
    );
  }
);
