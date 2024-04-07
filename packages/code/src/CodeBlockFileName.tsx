import {
  AppBarTitle,
  type AppBarTitleProps,
} from "@react-md/core/app-bar/AppBarTitle";
import { type ReactElement } from "react";

export function CodeBlockFileName(props: AppBarTitleProps): ReactElement {
  const { children, ...remaining } = props;

  return (
    <AppBarTitle type="subtitle-2" as="span" {...remaining}>
      {children}
    </AppBarTitle>
  );
}
