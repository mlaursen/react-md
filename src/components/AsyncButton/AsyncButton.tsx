import type { ButtonProps } from "@react-md/core";
import { box, Button, CircularProgress, useAsyncAction } from "@react-md/core";
import { cnb } from "cnbuilder";
import type { MouseEvent, ReactElement } from "react";

import styles from "./AsyncButton.module.scss";

export interface AsyncButtonProps extends ButtonProps {
  onClick(event: MouseEvent<HTMLButtonElement>): Promise<void>;
}

export function AsyncButton(props: AsyncButtonProps): ReactElement {
  const { onClick, children, theme, className, disabled, ...remaining } = props;
  const { handleAsync, pending } = useAsyncAction({ disabled });

  return (
    <Button
      {...remaining}
      aria-disabled={pending || undefined}
      disabled={disabled}
      className={cnb(pending && styles.loading, className)}
      theme={pending ? "disabled" : theme}
      onClick={handleAsync(onClick)}
    >
      {children}
      {pending && (
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
