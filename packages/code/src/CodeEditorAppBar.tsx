import {
  AppBar,
  type AppBarHeight,
  type AppBarProps,
  type AppBarTheme,
} from "@react-md/core/app-bar/AppBar";
import { cnb } from "cnbuilder";
import { type ReactElement } from "react";

export interface CodeEditorAppBarProps extends AppBarProps {
  /** @defaultValue "clear" */
  theme?: AppBarTheme;
  /** @defaultValue `"dense"` */
  height?: AppBarHeight;
}

export function CodeEditorAppBar(props: CodeEditorAppBarProps): ReactElement {
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
      className={cnb("code-editor-app-bar", className)}
    >
      {children}
    </AppBar>
  );
}
