import { Button } from "@react-md/core/button/Button";
import { Card } from "@react-md/core/card/Card";
import { CardContent } from "@react-md/core/card/CardContent";
import { CardHeader } from "@react-md/core/card/CardHeader";
import { CardSubtitle } from "@react-md/core/card/CardSubtitle";
import { CardTitle } from "@react-md/core/card/CardTitle";
import { type FileUploadActions } from "@react-md/core/files/useFileUpload";
import {
  type FileReaderResult,
  type FileUploadStats,
} from "@react-md/core/files/utils";
import { LinearProgress } from "@react-md/core/progress/LinearProgress";
import { Typography } from "@react-md/core/typography/Typography";
import CloseIcon from "@react-md/material-icons/CloseIcon";
import { filesize } from "filesize";
import { type HTMLAttributes, type ReactElement, useId } from "react";

import styles from "./FilePreviewCard.module.scss";
import { SimpleFilePreview } from "./SimpleFilePreview.js";

export interface FilePreviewCardProps
  extends HTMLAttributes<HTMLDivElement>, Omit<FileUploadStats, "key"> {
  fileKey: string;
  result?: FileReaderResult;
  remove: FileUploadActions["remove"];
}

export function FilePreviewCard({
  file,
  fileKey,
  result,
  status,
  progress,
  remove,
  ...props
}: FilePreviewCardProps): ReactElement {
  const { name, size } = file;
  const titleId = useId();

  return (
    <Card {...props} aria-labelledby={titleId} role="region">
      <CardHeader
        afterAddon={
          <Button
            aria-label="Remove"
            buttonType="icon"
            onClick={() => remove(fileKey)}
          >
            <CloseIcon />
          </Button>
        }
      >
        <CardTitle id={titleId} type="subtitle-2" textOverflow="nowrap">
          {name}
        </CardTitle>
        <CardSubtitle>{filesize(size).toString()}</CardSubtitle>
      </CardHeader>
      <CardContent className={styles.content}>
        {status !== "complete" && (
          <>
            <LinearProgress
              aria-label="File upload"
              value={progress}
              className={styles.progress}
            />
            <Typography textAlign="center" type="headline-4" as="p">
              Uploading...
            </Typography>
          </>
        )}
        {status === "complete" && (
          <SimpleFilePreview result={result} file={file} />
        )}
      </CardContent>
    </Card>
  );
}
