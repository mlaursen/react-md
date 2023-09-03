import type {
  FileReaderResult,
  FileUploadActions,
  FileUploadStats,
} from "@react-md/core";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardSubtitle,
  CardTitle,
  LinearProgress,
  responsiveItemContainer,
} from "@react-md/core";
import CloseIcon from "@react-md/material-icons/CloseIcon";
import InsertDriveFileIcon from "@react-md/material-icons/InsertDriveFileIcon";
import { cnb } from "cnbuilder";
import { filesize } from "filesize";
import type { HTMLAttributes, ReactElement } from "react";
import { useId } from "react";

import styles from "./FilePreview.module.scss";
import { Preview } from "./Preview";

export interface FilePreviewProps
  extends HTMLAttributes<HTMLDivElement>,
    Omit<FileUploadStats, "key"> {
  fileKey: string;
  result?: FileReaderResult;
  remove: FileUploadActions["remove"];
}

export function FilePreview({
  file,
  fileKey,
  result,
  status,
  progress,
  remove,
  className,
  ...props
}: FilePreviewProps): ReactElement {
  const { name, size } = file;
  const titleId = useId();

  return (
    <Card
      {...props}
      aria-labelledby={titleId}
      role="region"
      className={cnb(styles.container, className)}
    >
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
        <CardTitle id={titleId} type="subtitle-2" disableLineWrap>
          {name}
        </CardTitle>
        <CardSubtitle>{filesize(size).toString()}</CardSubtitle>
      </CardHeader>
      <CardContent
        className={responsiveItemContainer({
          responsive: "container",
          className: styles.content,
        })}
      >
        {status !== "complete" && (
          <>
            <InsertDriveFileIcon className={styles.icon} />
            <LinearProgress value={progress} className={styles.progress} />
          </>
        )}
        {status === "complete" && (
          <Preview file={file} result={result ?? null} />
        )}
      </CardContent>
    </Card>
  );
}