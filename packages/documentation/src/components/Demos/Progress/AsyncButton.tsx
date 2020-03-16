import React, { FC, ReactNode } from "react";
import { Button, ButtonProps } from "@react-md/button";
import { TextIconSpacing } from "@react-md/icon";
import { CloudDownloadSVGIcon } from "@react-md/material-icons";
import {
  CircularProgress,
  getProgressA11y,
  LinearProgress,
} from "@react-md/progress";
import { bem } from "@react-md/utils";

import "./AsyncButton.scss";

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

// this is used while the loading state is enabled to "disable" the button.
// If we disable the entire button, keyboard focus is lost which is not desired.
const noop = (): void => {};

const AsyncButton: FC<AsyncButtonProps> = providedProps => {
  const {
    id,
    loading,
    asyncType,
    onClick,
    ...props
  } = providedProps as WithDefaultProps;
  const { themeType } = props;

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
            <span className={block("overlay", { linear })}>
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
      className={block({ loading })}
      {...getProgressA11y(progressId, loading)}
      theme={loading ? "clear" : "primary"}
      onClick={loading ? noop : onClick}
      themeType={loading && themeType === "contained" ? "flat" : themeType}
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
