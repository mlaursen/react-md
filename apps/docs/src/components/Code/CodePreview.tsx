"use client";
import { Typography } from "@react-md/core";
import { type ReactElement } from "react";
import styles from "./CodePreview.module.scss";
import {
  useDangerouslyRunnableCode,
  type RunnableCodeScope,
} from "./useDangerouslyRunnableCode.jsx";

export interface CodePreviewProps {
  code: string;
  scope?: RunnableCodeScope;
}

export function CodePreview(props: CodePreviewProps): ReactElement {
  const { code, scope } = props;

  const [element, error] = useDangerouslyRunnableCode({ code, scope });

  return (
    <div className={styles.container}>
      {element}
      <div role="alert">
        {error && (
          <Typography type="caption" as="p">
            {error?.message}
          </Typography>
        )}
      </div>
    </div>
  );
}
