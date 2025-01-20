import { Box, type BoxProps } from "@react-md/core/box/Box";
import { cssUtils } from "@react-md/core/cssUtils";
import { Typography } from "@react-md/core/typography/Typography";
import { bem } from "@react-md/core/utils/bem";
import { cnb } from "cnbuilder";
import { type ReactElement, type ReactNode, useId } from "react";

const styles = bem("code-preview");

export interface ConfigurableCodePreviewProps extends BoxProps {
  disableBox?: boolean;
  transparent?: boolean;
  borderBottom?: boolean;
  forceDarkMode?: boolean;
}

export interface CodePreviewProps extends ConfigurableCodePreviewProps {
  error?: ReactNode;
}

export function CodePreview(props: CodePreviewProps): ReactElement {
  const {
    error,
    className,
    justify = "center",
    disableBox,
    transparent,
    borderBottom,
    forceDarkMode,
    disablePadding,
    children,
    ...remaining
  } = props;

  const id = useId();

  return (
    <Box
      {...remaining}
      justify={justify}
      disablePadding={disablePadding}
      className={cnb(
        styles({
          dark: forceDarkMode,
          block: disableBox,
          np: disablePadding,
          "no-bb": !borderBottom,
          transparent,
        }),
        className
      )}
    >
      {children}
      {error && (
        <div
          id={id}
          role="alert"
          className={cssUtils({
            textAlign: "right",
            textColor: "error",
            className: styles("error"),
          })}
        >
          <Typography type="caption" as="p">
            {error}
          </Typography>
        </div>
      )}
    </Box>
  );
}
