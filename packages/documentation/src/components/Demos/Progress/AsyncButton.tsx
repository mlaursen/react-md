import React, { ReactElement, ReactNode } from "react";
import cn from "classnames";
import { Button, ButtonProps } from "@react-md/button";
import { TextIconSpacing } from "@react-md/icon";
import { CloudDownloadSVGIcon } from "@react-md/material-icons";
import {
  CircularProgress,
  getProgressA11y,
  LinearProgress,
} from "@react-md/progress";

import styles from "./AsyncButton.module.scss";

export interface AsyncButtonProps extends ButtonProps {
  id: string;
  loading?: boolean;
  asyncType:
    | "circular-overlay"
    | "linear-overlay"
    | "icon-before"
    | "icon-after";
}

export default function AsyncButton({
  id,
  loading = false,
  asyncType,
  onClick,
  ...props
}: AsyncButtonProps): ReactElement {
  const progressId = `${id}-progress`;
  const linear = asyncType === "linear-overlay";
  let children: ReactNode = null;
  switch (asyncType) {
    case "icon-before":
    case "icon-after":
      children = (
        <TextIconSpacing
          iconAfter={asyncType === "icon-after"}
          icon={
            loading ? (
              <CircularProgress id={progressId} centered={false} />
            ) : (
              <CloudDownloadSVGIcon />
            )
          }
        >
          Download
        </TextIconSpacing>
      );
      break;
    case "circular-overlay":
    case "linear-overlay":
      children = (
        <>
          <TextIconSpacing icon={<CloudDownloadSVGIcon />}>
            {loading ? "Loading..." : "Download"}
          </TextIconSpacing>
          {loading && (
            <span
              className={cn(styles.overlay, {
                [styles.linear]: linear,
              })}
            >
              {linear ? (
                <LinearProgress id={progressId} />
              ) : (
                <CircularProgress id={progressId} />
              )}
            </span>
          )}
        </>
      );
    // no default
  }
  return (
    <Button
      {...props}
      id={id}
      className={styles.button}
      {...getProgressA11y(progressId, loading)}
      theme={loading ? "disabled" : "primary"}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
