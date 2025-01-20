import { cnb } from "cnbuilder";
import { type ReactElement } from "react";

import { MarkdownCode } from "@/components/MarkdownCode.jsx";

import styles from "./CopyCode.module.scss";

export interface CopyCodeProps {
  lang?: "tsx" | "html" | "scss";
  children: string;
  className?: string;
  disableMarginTop?: boolean;
}

export function CopyCode(props: CopyCodeProps): ReactElement {
  const { lang = "tsx", className, children, disableMarginTop } = props;
  return (
    <MarkdownCode
      lineWrap
      language={lang}
      className={className}
      disableMarginTop={disableMarginTop}
      containerProps={{
        className: cnb(!disableMarginTop && styles.container),
      }}
    >
      {children}
    </MarkdownCode>
  );
}
