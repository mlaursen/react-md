import { cssUtils } from "@react-md/core/cssUtils";
import {
  Typography,
  type TypographyProps,
} from "@react-md/core/typography/Typography";
import { cnb } from "cnbuilder";
import { type ReactElement, type ReactNode, type Ref } from "react";

import { DefaultFocusCodeEditorChildren } from "./DefaultFocusCodeEditorChildren.js";

export interface FocusCodeEditorProps extends TypographyProps {
  ref?: Ref<HTMLSpanElement>;
  /** @defaultValue `<DefaultFocusCodeEditorChildren />` */
  children?: ReactNode;
}

export function FocusCodeEditor(props: FocusCodeEditorProps): ReactElement {
  const {
    ref,
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
}
