import type { ButtonProps } from "@react-md/core";
import { box, Button, CircularProgress } from "@react-md/core";
import { cnb } from "cnbuilder";
import type { MouseEvent, ReactElement } from "react";
import { useEffect, useRef, useState } from "react";

import styles from "./AsyncButton.module.scss";

export interface AsyncButtonProps extends ButtonProps {
  onClick(event: MouseEvent<HTMLButtonElement>): Promise<void>;
}

export function AsyncButton(props: AsyncButtonProps): ReactElement {
  const { onClick, children, theme, className, ...remaining } = props;
  const [loading, setLoading] = useState(false);
  const unmounted = useRef(false);
  useEffect(() => {
    unmounted.current = false;
    return () => {
      unmounted.current = true;
    };
  }, []);

  return (
    <Button
      {...remaining}
      className={cnb(loading && styles.loading, className)}
      theme={loading ? "disabled" : theme}
      onClick={async (event) => {
        if (loading) {
          return;
        }

        setLoading(true);
        await onClick(event);
        if (!unmounted.current) {
          setLoading(false);
        }
      }}
    >
      {children}
      {loading && (
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
