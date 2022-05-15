import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import filesize from "filesize";
import cn from "classnames";
import { Button } from "@react-md/button";
import { Card, CardContent } from "@react-md/card";
import { DialogFooter } from "@react-md/dialog";
import {
  FileInput,
  Form,
  FormMessage,
  FormMessageCounter,
  getSplitFileUploads,
  useFileUpload,
} from "@react-md/form";
import { List, SimpleListItem } from "@react-md/list";
import {
  CheckCircleSVGIcon,
  CloseSVGIcon,
  FileUploadSVGIcon,
  WatchSVGIcon,
} from "@react-md/material-icons";
import { LinearProgress } from "@react-md/progress";
import { Typography } from "@react-md/typography";
import { useAppSize, useDropzone } from "@react-md/utils";

import { MAX_UPLOAD_SIZE } from "constants/constraints";

import styles from "./ServerUploadExample.module.scss";
import ErrorModal from "./ErrorModal";
import UnknownErrorDialog from "./UnknownErrorDialog";

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

const maxFiles = 5;

export default function ServerUploadExample(): ReactElement {
  const [errored, setErrored] = useState(false);
  const { isPhone } = useAppSize();
  const {
    stats,
    errors,
    onChange,
    clearErrors,
    reset,
    remove,
    onDrop,
    accept,
    totalBytes,
    totalFiles,
  } = useFileUpload({
    concurrency: 1,
    maxFiles,
    maxFileSize: MAX_UPLOAD_SIZE,
    totalFileSize: MAX_UPLOAD_SIZE,
    extensions,
    getFileParser: () => "readAsArrayBuffer",
  });
  const [isOver, dndHandlers] = useDropzone({ onDrop });
  const { complete } = getSplitFileUploads(stats);
  const [progress, setProgress] = useState<number | undefined>();
  useEffect(() => {
    if (progress !== 100) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setProgress(undefined);
    }, 5000);
    return () => {
      window.clearTimeout(timeout);
    };
  }, [progress]);
  const roundedSize = Math.min(MAX_UPLOAD_SIZE, Math.round(totalBytes));
  const percentage = (totalBytes / MAX_UPLOAD_SIZE) * 100;

  return (
    <Card className={styles.container}>
      <CardContent>
        <Form
          className={styles.form}
          onSubmit={async () => {
            const data = new FormData();
            complete.forEach(({ file }) => {
              data.append("files[]", file, file.name);
            });

            const xhr = new XMLHttpRequest();
            xhr.upload.addEventListener("progress", (event) => {
              if (event.lengthComputable) {
                const percentage = Math.round(
                  (event.loaded * 100) / event.total
                );
                setProgress(percentage);
              }
            });
            xhr.upload.addEventListener("load", () => {
              setProgress(100);
            });
            xhr.upload.addEventListener("error", () => {
              setErrored(true);
            });
            xhr.addEventListener("error", () => {
              setErrored(true);
            });
            xhr.open("POST", "/api/devnull", true);
            setProgress(0);
            xhr.send(data);
          }}
        >
          <ErrorModal errors={errors} clearErrors={clearErrors} />
          <List
            {...dndHandlers}
            ordered
            className={cn(styles.list, isOver && styles.dropzone)}
          >
            {stats.map((uploadStats) => (
              <SimpleListItem
                key={uploadStats.key}
                leftAddon={
                  uploadStats.status === "pending" ? (
                    <WatchSVGIcon />
                  ) : uploadStats.status === "uploading" ? (
                    <FileUploadSVGIcon />
                  ) : (
                    <CheckCircleSVGIcon className={styles.success} />
                  )
                }
                rightAddon={
                  <Button
                    buttonType="icon"
                    onClick={() => remove(uploadStats.key)}
                  >
                    <CloseSVGIcon />
                  </Button>
                }
                primaryText={uploadStats.file.name}
                secondaryText={filesize(uploadStats.file.size)}
              />
            ))}
            {Array.from(
              { length: Math.max(0, maxFiles - totalFiles) },
              (_, i) => (
                <SimpleListItem
                  key={i}
                  leftAddon={<FileUploadSVGIcon />}
                  primaryText={`Remaining File ${totalFiles + i + 1}`}
                  height="extra-large"
                  disabled
                  disabledOpacity
                />
              )
            )}
          </List>
          <FileInput
            id="file-upload-input"
            onChange={onChange}
            accept={accept}
            multiple
            buttonType="text"
            disabled={totalFiles >= maxFiles || typeof progress === "number"}
            className={styles.upload}
          >
            {`Upload${isPhone ? "" : "or Drag and Drop"}`}
          </FileInput>
          <LinearProgress
            id="total-size-allowed"
            min={0}
            max={MAX_UPLOAD_SIZE}
            value={roundedSize}
            className={cn({
              [styles.yellow]: percentage >= 70 && percentage < 85,
              [styles.warning]: percentage >= 85,
            })}
          />
          <FormMessage
            id="total-size-allowed-counter"
            theme="none"
            disableWrap
            error={totalBytes > MAX_UPLOAD_SIZE}
          >
            <FormMessageCounter>
              {`${filesize(totalBytes)} / ${filesize(MAX_UPLOAD_SIZE)}`}
            </FormMessageCounter>
          </FormMessage>
          <DialogFooter>
            <Button
              type="reset"
              onClick={reset}
              disabled={typeof progress === "number"}
            >
              Reset
            </Button>
            <Button
              type="submit"
              theme="primary"
              disabled={stats.length === 0 || typeof progress === "number"}
            >
              Submit
            </Button>
          </DialogFooter>
          {typeof progress === "number" && (
            <LinearProgress id="upload-progress" value={progress} />
          )}
          {progress === 100 && <Typography>Upload Complete!</Typography>}
        </Form>
      </CardContent>
      <UnknownErrorDialog
        reset={() => {
          reset();
          setProgress(undefined);
          setErrored(false);
        }}
        visible={errored}
      />
    </Card>
  );
}
