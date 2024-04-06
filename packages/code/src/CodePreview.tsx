import { Box, type BoxProps } from "@react-md/core/box/Box";
import { cssUtils } from "@react-md/core/cssUtils";
import { Typography } from "@react-md/core/typography/Typography";
import { bem } from "@react-md/core/utils/bem";
import { cnb } from "cnbuilder";
import { useId, type ReactElement, type ReactNode } from "react";

const styles = bem("code-preview");

export interface ConfigurableCodePreviewProps extends BoxProps {
  transparent?: boolean;
  borderBottom?: boolean;
}

export interface CodePreviewProps extends ConfigurableCodePreviewProps {
  error?: ReactNode;
}

export function CodePreview(props: CodePreviewProps): ReactElement {
  const {
    error,
    className,
    justify = "center",
    borderBottom = false,
    transparent,
    children,
    ...remaining
  } = props;

  const id = useId();

  return (
    <Box
      {...remaining}
      justify={justify}
      className={cnb(
        styles({ transparent, "no-bb": !borderBottom }),
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
