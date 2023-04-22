import type { FileReaderResult } from "@react-md/core";
import {
  isImageFile,
  isVideoFile,
  ResponsiveItemOverlay,
  TextIconSpacing,
  Typography,
} from "@react-md/core";
import ErrorIcon from "@react-md/material-icons/ErrorIcon";
import type { ReactElement } from "react";
import { useState } from "react";

import styles from "./Preview.module.scss";

const THREE_MB = 3 * 1024 * 1024;

export interface PreviewProps {
  file: File;
  result: FileReaderResult;
}

export function Preview({ file, result }: PreviewProps): ReactElement {
  const [error, setError] = useState(false);

  const onError = (): void => setError(true);
  const isGifLike = file.size < THREE_MB;

  return (
    <>
      {(typeof result !== "string" || error) && (
        <ResponsiveItemOverlay position="middle" className={styles.overlay}>
          <TextIconSpacing stacked icon={<ErrorIcon />}>
            <Typography>
              {!error
                ? "I did not set up a preview for this file type."
                : "Your Browser is unable to preview this file."}
            </Typography>
          </TextIconSpacing>
        </ResponsiveItemOverlay>
      )}
      {typeof result === "string" && (
        <>
          {isImageFile(file) && <img src={result} alt="" onError={onError} />}
          {isVideoFile(file) && (
            <video
              muted
              controls={!isGifLike}
              loop={isGifLike}
              autoPlay={isGifLike}
              onError={onError}
            >
              <source src={result} type={file.type || "video/webm"} />
            </video>
          )}
        </>
      )}
    </>
  );
}
