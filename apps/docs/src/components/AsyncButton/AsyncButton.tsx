import type { ButtonProps } from "@react-md/core";
import { box, Button, CircularProgress, useAsyncAction } from "@react-md/core";
import { cnb } from "cnbuilder";
import type { MouseEvent, ReactElement } from "react";

import styles from "./AsyncButton.module.scss";

export interface AsyncButtonProps extends ButtonProps {
  onClick(event: MouseEvent<HTMLButtonElement>): Promise<void>;
  pending?: boolean;
}

export function AsyncButton(props: AsyncButtonProps): ReactElement {
  const {
    onClick,
    children,
    theme,
    className,
    disabled,
    pending: propPending,
    ...remaining
  } = props;
  const { handleAsync, pending } = useAsyncAction({ disabled });
  const isPending = pending || propPending;

  return (
    <Button
      {...remaining}
      aria-disabled={isPending || undefined}
      disabled={disabled}
      className={cnb(isPending && styles.loading, className)}
      theme={isPending ? "disabled" : theme}
      onClick={handleAsync(onClick)}
    >
      {children}
      {isPending && (
        <span
          className={box({
            align: "center",
            disablePadding: true,
            className: styles.overlay,
          })}
        >
          <CircularProgress />
        </span>
      )}
    </Button>
  );
}
