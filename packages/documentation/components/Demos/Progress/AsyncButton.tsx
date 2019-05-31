import React, { FC, Fragment, ReactNode } from "react";
import { Button, ButtonProps } from "@react-md/button";
import {
  getProgressA11y,
  CircularProgress,
  LinearProgress,
} from "@react-md/progress";
import { bem } from "@react-md/theme";

import "./async-button.scss";
import { TextIconSpacing } from "@react-md/icon";
import { CloudDownloadSVGIcon } from "@react-md/material-icons";

export interface AsyncButtonProps extends ButtonProps {
  id: string;
  loading?: boolean;
  asyncType:
    | "circular-overlay"
    | "linear-overlay"
    | "icon-before"
    | "icon-after";
}

type DefaultProps = Required<Pick<AsyncButtonProps, "loading">>;
type WithDefaultProps = AsyncButtonProps & DefaultProps;

const block = bem("async-button");

const AsyncButton: FC<AsyncButtonProps> = providedProps => {
  const {
    id,
    disabled,
    loading,
    asyncType,
    ...props
  } = providedProps as WithDefaultProps;

  const progressId = `${id}-progress`;
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
      const linear = asyncType === "linear-overlay";
      children = (
        <Fragment>
          <TextIconSpacing icon={<CloudDownloadSVGIcon />}>
            {loading ? "Loading..." : "Download"}
          </TextIconSpacing>
          {loading && (
            <span className={block("overlay", { linear })}>
              {linear ? (
                <LinearProgress id={progressId} />
              ) : (
                <CircularProgress id={progressId} />
              )}
            </span>
          )}
        </Fragment>
      );
  }
  return (
    <Button
      {...props}
      id={id}
      disabled={disabled || loading}
      className={block()}
      {...getProgressA11y(progressId, loading)}
      theme="primary"
    >
      {children}
    </Button>
  );
};

const defaultProps: DefaultProps = {
  loading: false,
};

AsyncButton.defaultProps = defaultProps;

export default AsyncButton;
