import { Box, Typography, type BoxProps } from "@react-md/core";
import { cnb } from "cnbuilder";
import { useId, type ReactElement, type ReactNode } from "react";
import styles from "./CodePreviewContainer.module.scss";

export interface CodePreviewContainerProps extends BoxProps {
  error?: ReactNode;
  children: ReactNode;
  borderBottom?: boolean;
}

export function CodePreviewContainer(
  props: CodePreviewContainerProps
): ReactElement {
  const {
    error,
    children,
    className,
    justify = "center",
    borderBottom = false,
    ...remaining
  } = props;
  const id = useId();

  return (
    <Box
      {...remaining}
      justify={justify}
      className={cnb(
        styles.container,
        !borderBottom && styles.noBorderBottom,
        className
      )}
    >
      {children}
      {error && (
        <div id={id} role="alert" className={styles.alert}>
          <Typography type="caption" as="p">
            {error}
          </Typography>
        </div>
      )}
    </Box>
  );
}
