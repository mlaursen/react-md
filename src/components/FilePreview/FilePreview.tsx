import { Button } from "@react-md/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardSubtitle,
  CardTitle,
} from "@react-md/card";
import type {
  FileReaderResult,
  FileUploadActions,
  FileUploadStats,
} from "@react-md/form";
import CloseIcon from "@react-md/material-icons/CloseIcon";
import InsertDriveFileIcon from "@react-md/material-icons/InsertDriveFileIcon";
import { LinearProgress } from "@react-md/progress";
import { visualMediaContainer } from "@react-md/visual-media";
import { cnb } from "cnbuilder";
import { filesize } from "filesize";
import type { HTMLAttributes, ReactElement } from "react";

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

  return (
    <Card {...props} className={cnb(styles.container, className)}>
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
        <CardTitle type="subtitle-2" disableLineWrap>
          {name}
        </CardTitle>
        <CardSubtitle>{filesize(size).toString()}</CardSubtitle>
      </CardHeader>
      <CardContent
        className={visualMediaContainer({
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
