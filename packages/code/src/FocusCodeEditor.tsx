import { cssUtils } from "@react-md/core/cssUtils";
import {
  Typography,
  type TypographyProps,
} from "@react-md/core/typography/Typography";
import { cnb } from "cnbuilder";
import { type ReactNode, forwardRef } from "react";

import { DefaultFocusCodeEditorChildren } from "./DefaultFocusCodeEditorChildren.js";

export interface FocusCodeEditorProps extends TypographyProps {
  /** @defaultValue `<DefaultFocusCodeEditorChildren />` */
  children?: ReactNode;
}

export const FocusCodeEditor = forwardRef<
  HTMLSpanElement,
  FocusCodeEditorProps
>(function FocusCodeEditor(props, ref) {
  const {
    className,
    children = <DefaultFocusCodeEditorChildren />,
    ...remaining
  } = props;

  return (
    <Typography
      aria-live="polite"
      ref={ref}
      type="body-2"
      tabIndex={0}
      {...remaining}
      className={cnb(
        "code-editor__message",
        cssUtils({ srOnly: "focusable" }),
        className
      )}
    >
      {children}
    </Typography>
  );
});
