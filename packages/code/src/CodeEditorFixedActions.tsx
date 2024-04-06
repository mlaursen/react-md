import { Box, type BoxProps } from "@react-md/core/box/Box";
import { bem } from "@react-md/core/utils/bem";
import { cnb } from "cnbuilder";
import { type ReactElement, type ReactNode } from "react";

const styles = bem("code-editor");

export interface CodeEditorFixedActionsProps extends BoxProps {
  children: ReactNode;
}

export function CodeEditorFixedActions(
  props: CodeEditorFixedActionsProps
): ReactElement {
  const { className, children, ...remaining } = props;

  return (
    <Box
      justify="end"
      {...remaining}
      className={cnb(styles("actions"), className)}
    >
      {children}
    </Box>
  );
}
