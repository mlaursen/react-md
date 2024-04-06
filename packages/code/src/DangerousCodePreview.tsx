import { Box, type BoxProps } from "@react-md/core/box/Box";
import { cssUtils } from "@react-md/core/cssUtils";
import { Typography } from "@react-md/core/typography/Typography";
import { bem } from "@react-md/core/utils/bem";
import { cnb } from "cnbuilder";
import { useId, type ReactElement } from "react";
import {
  useDangerouslyRunnableCode,
  type DangerouslyRunCodeOptions,
} from "./useDangerousCodeRunner.js";

const styles = bem("code-preview");

export interface ConfigurableDangerousCodePreviewProps extends BoxProps {
  transparent?: boolean;
  borderBottom?: boolean;
}

export interface DangerousCodePreviewProps
  extends ConfigurableDangerousCodePreviewProps,
    DangerouslyRunCodeOptions {}

export function DangerousCodePreview(
  props: DangerousCodePreviewProps
): ReactElement {
  const {
    code,
    scope,
    className,
    justify = "center",
    borderBottom = false,
    transparent,
    onRendered,
    ...remaining
  } = props;

  const id = useId();
  const { error, element } = useDangerouslyRunnableCode({
    code,
    scope,
    onRendered,
  });

  return (
    <Box
      {...remaining}
      justify={justify}
      className={cnb(
        styles({ transparent, "no-bb": !borderBottom }),
        className
      )}
    >
      {element}
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
            {error.message}
          </Typography>
        </div>
      )}
    </Box>
  );
}
