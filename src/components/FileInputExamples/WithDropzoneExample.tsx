import {
  Box,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Typography,
  useDropzone,
} from "@react-md/core";
import { DialogFooter } from "@react-md/dialog";
import {
  FileInput,
  Form,
  FormMessage,
  FormMessageCounter,
  useFileUpload,
} from "@react-md/form";
import { List, listItem, ListItemChildren } from "@react-md/list";
import CheckCircleIcon from "@react-md/material-icons/CheckCircleIcon";
import CloseIcon from "@react-md/material-icons/CloseIcon";
import FileUploadIcon from "@react-md/material-icons/FileUploadIcon";
import WatchIcon from "@react-md/material-icons/WatchIcon";
import { cnb } from "cnbuilder";
import { filesize } from "filesize";
import type { ReactElement } from "react";
import { FileUploadErrorModal } from "../FileUploadErrorModal";
import styles from "./WithDropzoneExample.module.scss";

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
const MAX_UPLOAD_SIZE = 5 * 1000 * 1000;

export function WithDropzoneExample(): ReactElement {
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
  const {
    isOver,
    isDragging,
    dropzoneHandlers: dropzoneProps,
  } = useDropzone({
    onDrop,
  });
  const roundedSize = Math.min(MAX_UPLOAD_SIZE, Math.round(totalBytes));
  const percentage = (totalBytes / MAX_UPLOAD_SIZE) * 100;

  return (
    <Card className={styles.container} fullWidth>
      <CardContent>
        <Form className={styles.form}>
          <FileUploadErrorModal errors={errors} clearErrors={clearErrors} />
          {isDragging && (
            <Box className={styles.overlay} stacked>
              <Typography type="headline-4">Drop Here</Typography>
              {isOver && <FileUploadIcon />}
            </Box>
          )}
          <List
            {...dropzoneProps}
            ordered
            className={cnb(
              styles.list,
              styles.dropzone,
              isDragging && styles.dragging
            )}
          >
            {stats.map((uploadStats) => (
              <li
                key={uploadStats.key}
                className={listItem({
                  height: "extra-large",
                  clickable: false,
                })}
              >
                <ListItemChildren
                  leftAddon={
                    uploadStats.status === "pending" ? (
                      <WatchIcon />
                    ) : uploadStats.status === "uploading" ? (
                      <FileUploadIcon />
                    ) : (
                      <CheckCircleIcon className={styles.success} />
                    )
                  }
                  rightAddon={
                    <Button
                      buttonType="icon"
                      onClick={() => remove(uploadStats.key)}
                    >
                      <CloseIcon />
                    </Button>
                  }
                  primaryText={uploadStats.file.name}
                  secondaryText={filesize(uploadStats.file.size).toString()}
                />
              </li>
            ))}
            {Array.from(
              { length: Math.max(0, maxFiles - totalFiles) },
              (_, i) => (
                <li
                  key={i}
                  className={listItem({
                    height: "extra-large",
                    clickable: false,
                    disabled: true,
                    disabledOpacity: true,
                  })}
                >
                  <ListItemChildren
                    leftAddon={<FileUploadIcon />}
                    primaryText={`Remaining File ${totalFiles + i + 1}`}
                  />
                </li>
              )
            )}
          </List>
          <FileInput
            onChange={onChange}
            accept={accept}
            multiple
            buttonType="text"
            disabled={totalFiles >= maxFiles}
            className={styles.upload}
          >
            Upload
          </FileInput>
          <LinearProgress
            min={0}
            max={MAX_UPLOAD_SIZE}
            value={roundedSize}
            className={cnb({
              [styles.yellow]: percentage >= 70 && percentage < 85,
              [styles.warning]: percentage >= 85,
            })}
          />
          <FormMessage
            theme="none"
            disableWrap
            error={totalBytes > MAX_UPLOAD_SIZE}
          >
            <FormMessageCounter>
              {`${filesize(totalBytes)} / ${filesize(MAX_UPLOAD_SIZE)}`}
            </FormMessageCounter>
          </FormMessage>
          <DialogFooter>
            <Button type="reset" onClick={reset}>
              Reset
            </Button>
            <Button type="submit" theme="primary" disabled={stats.length === 0}>
              Submit
            </Button>
          </DialogFooter>
        </Form>
      </CardContent>
    </Card>
  );
}
