import { Box, Typography, type BoxProps } from "react-md";
import { cnb } from "cnbuilder";
import { useId, type ReactElement, type ReactNode } from "react";
import styles from "./CodePreviewContainer.module.scss";

export interface CodePreviewContainerProps extends BoxProps {
  error?: ReactNode;
  children: ReactNode;
  transparent?: boolean;
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
    transparent,
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
        transparent && styles.transparent,
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
