"use client";

import { Box } from "@react-md/core/box/Box";
import { Button } from "@react-md/core/button/Button";
import { Card } from "@react-md/core/card/Card";
import { CardContent } from "@react-md/core/card/CardContent";
import { FileInput } from "@react-md/core/files/FileInput";
import { useFileUpload } from "@react-md/core/files/useFileUpload";
import {
  type CompletedFileUploadStats,
  getSplitFileUploads,
} from "@react-md/core/files/utils";
import { Form } from "@react-md/core/form/Form";
import { FormMessage } from "@react-md/core/form/FormMessage";
import { FormMessageCounter } from "@react-md/core/form/FormMessageCounter";
import { List } from "@react-md/core/list/List";
import { ListItem } from "@react-md/core/list/ListItem";
import {
  DEFAULT_OVERLAY_CLASSNAMES,
  DEFAULT_OVERLAY_TIMEOUT,
} from "@react-md/core/overlay/overlayStyles";
import { LinearProgress } from "@react-md/core/progress/LinearProgress";
import { CSSTransition } from "@react-md/core/transition/CSSTransition";
import { Typography } from "@react-md/core/typography/Typography";
import { useAsyncFunction } from "@react-md/core/useAsyncFunction";
import { useDropzone } from "@react-md/core/useDropzone";
import { randomInt } from "@react-md/core/utils/randomInt";
import { wait } from "@react-md/core/utils/wait";
import FileUploadIcon from "@react-md/material-icons/FileUploadIcon";
import { cnb } from "cnbuilder";
import { filesize } from "filesize";
import CheckCircleIcon from "node_modules/@react-md/material-icons/src/CheckCircleIcon.jsx";
import CloseIcon from "node_modules/@react-md/material-icons/src/CloseIcon.jsx";
import WatchIcon from "node_modules/@react-md/material-icons/src/WatchIcon.jsx";
import { type ReactElement, useState } from "react";

import { FileUploadErrorModal } from "@/components/FileUploadErrorModal/FileUploadErrorModal.jsx";

import styles from "./ServerUploadExample.module.scss";

export default function ServerUploadExample(): ReactElement {
  const {
    stats,
    errors,
    clearErrors,
    accept,
    onDrop,
    onChange,
    reset,
    remove,
    totalBytes,
    totalFiles,
  } = useFileUpload({
    // this makes it so that only one `uploading` files can be active at a time
    // and the remaining files are put in the `pending` queue
    concurrency: 1,
    extensions,
    maxFiles,
    maxFileSize,
    getFileParser: () => "readAsArrayBuffer",
  });
  const { pending, uploading, complete } = getSplitFileUploads(stats);
  const { dropzoneHandlers, isOver, isDragging } = useDropzone({ onDrop });
  const { progress, isUploading, onSubmit, resetProgress } =
    useFakeServerUpload(complete, totalBytes);
  const roundedSize = Math.min(maxFileSize, Math.round(totalBytes));
  const percentage = (totalBytes / maxFileSize) * 100;

  return (
    <Card className={styles.card} fullWidth>
      <CardContent>
        <Form onReset={reset} onSubmit={onSubmit}>
          <List
            ordered
            {...(!isUploading && dropzoneHandlers)}
            className={cnb(
              styles.list,
              isOver && styles.dragover,
              (isOver || isDragging) && styles.dragging
            )}
          >
            {stats.map((stat) => (
              <ListItem
                key={stat.key}
                presentational
                leftAddon={
                  stat.status === "pending" ? (
                    <WatchIcon />
                  ) : stat.status === "uploading" ? (
                    <FileUploadIcon />
                  ) : (
                    <CheckCircleIcon theme="success" />
                  )
                }
                rightAddon={
                  <Button
                    onClick={() => remove(stat.key)}
                    buttonType="icon"
                    aria-label="Remove"
                  >
                    <CloseIcon />
                  </Button>
                }
                secondaryText={filesize(stat.file.size)}
              >
                {stat.file.name}
              </ListItem>
            ))}
            {Array.from(
              { length: Math.max(0, maxFiles - totalFiles) },
              (_, i) => (
                <ListItem
                  key={i}
                  height="extra-large"
                  disabled
                  disabledOpacity
                  leftAddon={<FileUploadIcon />}
                >
                  {`Remaining File ${i + 1 + totalFiles}`}
                </ListItem>
              )
            )}
          </List>
          <FileInput
            onChange={onChange}
            accept={accept}
            multiple
            disabled={isUploading || totalFiles > maxFiles}
            className={styles.upload}
          >
            Upload <span className={styles.phoneHidden}>or Drag and Drop</span>
          </FileInput>
          <LinearProgress
            aria-label="Upload limit"
            aria-describedby="total-size-allowed-counter"
            value={roundedSize}
            max={maxFileSize}
            className={cnb(percentage >= 70 && styles.progress)}
            theme={
              percentage >= 85
                ? "error"
                : percentage >= 70
                  ? "warning"
                  : undefined
            }
          />
          <FormMessage
            id="total-size-allowed-counter"
            theme="none"
            disableWrap
            error={totalBytes > maxFileSize}
          >
            <FormMessageCounter>
              {`${filesize(totalBytes)} / ${filesize(maxFileSize)}`}
            </FormMessageCounter>
          </FormMessage>
          <Box justify="end" fullWidth disablePadding>
            <Button
              type="reset"
              theme="warning"
              themeType="contained"
              disabled={isUploading}
            >
              Reset
            </Button>
            <Button
              type="submit"
              disabled={
                isUploading ||
                !!errors.length ||
                !complete.length ||
                !!pending.length ||
                !!uploading.length
              }
              theme="primary"
              themeType="contained"
            >
              Submit
            </Button>
          </Box>
          {typeof progress === "number" && (
            <LinearProgress
              aria-label="Upload Progress"
              value={progress}
              max={totalBytes}
              className={styles.uploadProgress}
            />
          )}
          <CSSTransition
            transitionIn={progress === totalBytes}
            temporary
            timeout={{ enter: 3000 + DEFAULT_OVERLAY_TIMEOUT }}
            classNames={DEFAULT_OVERLAY_CLASSNAMES}
            onEntered={() => {
              reset();
              resetProgress();
            }}
          >
            <Typography>Upload Complete! Resetting in 3 seconds.</Typography>
          </CSSTransition>
          <FileUploadErrorModal errors={errors} clearErrors={clearErrors} />
        </Form>
      </CardContent>
    </Card>
  );
}

const extensions = [
  "svg",
  "jpeg",
  "jpg",
  "png",
  "apng",
  "mkv",
  "mp4",
  "mpeg",
  "mpg",
  "webm",
  "mov",
];

const TEN_GIGABYTE = 10 * 1024 * 1024 * 1024;
const maxFiles = 5;
const maxFileSize = TEN_GIGABYTE;

interface FakeServerUploadImplementation {
  onSubmit: () => Promise<void>;
  progress: number | undefined;
  isUploading: boolean;
  resetProgress: () => void;
}

function useFakeServerUpload(
  complete: readonly CompletedFileUploadStats[],
  totalSize: number
): FakeServerUploadImplementation {
  const { handleAsync, pending } = useAsyncFunction();
  const [progress, setProgress] = useState<number | undefined>(undefined);

  return {
    onSubmit: handleAsync(async () => {
      // you might do something like this:
      // const data = new FormData();
      // complete.forEach(({ file }) => {
      //   data.append("files[]", file, file.name);
      // });
      //
      // await fetch("/api/file-upload", {
      //   method: "POST",
      //   body: data,
      // });

      // but I don't want to implement a server upload here, so instead here's
      // a fake upload with progress
      setProgress(0);
      let current = 0;
      const chunks = getRandomUploadSizes(
        totalSize,
        randomInt({ min: 5, max: 15 })
      );
      for (const bytes of chunks) {
        await wait(randomInt({ min: 15, max: 300 }));

        current += bytes;
        setProgress(Math.min(totalSize, current));
      }
      // just in case the random upload sizes failed
      setProgress(totalSize);
    }),
    progress,
    isUploading: pending || typeof progress === "number",
    resetProgress: () => setProgress(undefined),
  };
}

function getRandomUploadSizes(
  totalSize: number,
  chunks = 10
): readonly number[] {
  const numbers = Array.from({ length: chunks }, () => Math.random());
  const sum = numbers.reduce((total, n) => total + n, 0);
  const scale = totalSize / sum;

  return numbers.map((n) => Math.round(n * scale));
}
