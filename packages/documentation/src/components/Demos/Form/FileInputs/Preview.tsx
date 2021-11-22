import { ReactElement, useState } from "react";
import { FileReaderResult, isImageFile, isVideoFile } from "@react-md/form";
import { ErrorSVGIcon } from "@react-md/material-icons";
import { MediaOverlay } from "@react-md/media";
import { TextIconSpacing } from "@react-md/icon";
import { Text } from "@react-md/typography";

import styles from "./Preview.module.scss";

const THREE_MB = 3 * 1024 * 1024;

export interface PreviewProps {
  file: File;
  result: FileReaderResult;
}

export default function Preview({ file, result }: PreviewProps): ReactElement {
  const [error, setError] = useState(false);

  const onError = (): void => setError(true);
  const isGifLike = file.size < THREE_MB;

  return (
    <>
      {(typeof result !== "string" || error) && (
        <MediaOverlay position="middle" className={styles.overlay}>
          <TextIconSpacing stacked icon={<ErrorSVGIcon />}>
            <Text>
              {!error
                ? "I did not set up a preview for this file type."
                : "Your Browser is unable to preview this file."}
            </Text>
          </TextIconSpacing>
        </MediaOverlay>
      )}
      {typeof result === "string" && (
        <>
          {isImageFile(file) && (
            <img
              src={result}
              alt=""
              onError={onError}
              className={styles.responsive}
            />
          )}
          {isVideoFile(file) && (
            <video
              muted
              controls={!isGifLike}
              loop={isGifLike}
              autoPlay={isGifLike}
              onError={onError}
              className={styles.responsive}
            >
              <source src={result} type={file.type || "video/webm"} />
            </video>
          )}
        </>
      )}
    </>
  );
}
