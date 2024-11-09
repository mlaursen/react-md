import { AppBar, type AppBarProps } from "@react-md/core/app-bar/AppBar";
import {
  type AppBarHeight,
  type AppBarTheme,
} from "@react-md/core/app-bar/styles";
import { cnb } from "cnbuilder";
import { type ReactElement } from "react";

export interface CodeBlockAppBarProps extends AppBarProps {
  /** @defaultValue "clear" */
  theme?: AppBarTheme;
  /** @defaultValue `"dense"` */
  height?: AppBarHeight;
}

export function CodeBlockAppBar(props: CodeBlockAppBarProps): ReactElement {
  const {
    theme = "clear",
    height = "dense",
    className,
    children,
    ...remaining
  } = props;

  return (
    <AppBar
      {...remaining}
      theme={theme}
      height={height}
      className={cnb("code-block-app-bar", className)}
    >
      {children}
    </AppBar>
  );
}
