import { HTMLAttributes, ReactElement } from "react";
import cn from "classnames";
import filesize from "filesize";
import { Button } from "@react-md/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardSubtitle,
  CardTitle,
} from "@react-md/card";
import {
  FileReaderResult,
  FileUploadActions,
  FileUploadStats,
} from "@react-md/form";
import { CloseSVGIcon } from "@react-md/material-icons";
import { LinearProgress } from "@react-md/progress";
import { GridListCell } from "@react-md/utils";

import FileSVGIcon from "icons/FileSVGIcon";

import styles from "./PreviewFile.module.scss";
import Preview from "./Preview";

export interface PreviewFileProps
  extends Omit<FileUploadStats, "key">,
    HTMLAttributes<HTMLDivElement> {
  id: string;
  fileKey: string;
  result?: FileReaderResult;
  remove: FileUploadActions["remove"];
}

export default function PreviewFile({
  id,
  file,
  fileKey,
  result,
  status,
  progress,
  remove,
  className,
  ...props
}: PreviewFileProps): ReactElement {
  const { name, size } = file;
  return (
    <GridListCell clone square>
      <Card {...props} id={id} className={cn(styles.container, className)}>
        <CardHeader
          afterChildren={
            <Button
              id={`${id}-remove`}
              aria-label="Remove"
              buttonType="icon"
              onClick={() => remove(fileKey)}
            >
              <CloseSVGIcon />
            </Button>
          }
        >
          <CardTitle small noWrap>
            {name}
          </CardTitle>
          <CardSubtitle>{filesize(size)}</CardSubtitle>
        </CardHeader>
        <CardContent className={cn(styles.container, styles.content)}>
          {status !== "complete" && (
            <>
              <FileSVGIcon className={styles.icon} />
              <LinearProgress
                id={`${id}-upload-progress`}
                value={progress}
                className={styles.progress}
              />
            </>
          )}
          {status === "complete" && (
            <Preview file={file} result={result ?? null} />
          )}
        </CardContent>
      </Card>
    </GridListCell>
  );
}
