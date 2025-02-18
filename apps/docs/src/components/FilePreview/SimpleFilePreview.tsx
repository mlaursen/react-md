"use client";

import { box } from "@react-md/core/box/styles";
import {
  type FileReaderResult,
  isImageFile,
  isVideoFile,
} from "@react-md/core/files/utils";
import { objectFit } from "@react-md/core/objectFit";
import { ResponsiveItemOverlay } from "@react-md/core/responsive-item/ResponsiveItemOverlay";
import { Typography } from "@react-md/core/typography/Typography";
import { useToggle } from "@react-md/core/useToggle";
import ErrorIcon from "@react-md/material-icons/ErrorIcon";
import { type ReactElement } from "react";

const THREE_MB = 3 * 1024 * 1024;

export interface SimpleFilePreviewProps {
  result?: FileReaderResult;
  file: File;
}

export function SimpleFilePreview(props: SimpleFilePreviewProps): ReactElement {
  const { file, result } = props;
  const isGifLike = file.size < THREE_MB;
  const { toggled: error, enable: handleError } = useToggle();

  return (
    <>
      {(typeof result !== "string" || error) && (
        <ResponsiveItemOverlay
          position="middle"
          className={box({ stacked: true, disablePadding: true })}
        >
          <ErrorIcon theme="error" />
          <Typography>
            {!error
              ? "I did not set up a preview for this file type."
              : "Your Browser is unable to preview this file."}
          </Typography>
        </ResponsiveItemOverlay>
      )}
      {typeof result === "string" && (
        <>
          {isImageFile(file) && (
            <img
              src={result}
              alt=""
              onError={handleError}
              className={objectFit()}
            />
          )}
          {isVideoFile(file) && (
            <video
              muted
              controls={!isGifLike && !error}
              loop={isGifLike}
              autoPlay={isGifLike}
              onError={handleError}
              className={objectFit()}
            >
              <source src={result} type={file.type || "video/webm"} />
            </video>
          )}
        </>
      )}
    </>
  );
}
// @importOnly
