"use client";

import { Box } from "@react-md/core/box/Box";
import { Button } from "@react-md/core/button/Button";
import { FileInput } from "@react-md/core/files/FileInput";
import {
  type FileUploadOptions,
  useFileUpload,
} from "@react-md/core/files/useFileUpload";
import { Form } from "@react-md/core/form/Form";
import { FormMessage } from "@react-md/core/form/FormMessage";
import { FormMessageCounter } from "@react-md/core/form/FormMessageCounter";
import { LinearProgress } from "@react-md/core/progress/LinearProgress";
import { type ReactElement } from "react";

import { FilePreviewCard } from "@/components/FilePreview/FilePreviewCard.jsx";
import { FileUploadErrorModal } from "@/components/FileUploadErrorModal/FileUploadErrorModal.jsx";

import styles from "./FileUploadExample.module.scss";

export const EXTENSIONS = [
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
] as const;

export const FOUR_HUNDRED_MB = 400 * 1024 * 1024;
export const MAX_FILES = 10;

export type FileUploadExampleProps = Partial<FileUploadOptions<HTMLElement>>;

export default function FileUploadExample(
  props: FileUploadExampleProps
): ReactElement {
  const {
    maxFiles = MAX_FILES,
    maxFileSize = FOUR_HUNDRED_MB,
    extensions = EXTENSIONS,
  } = props;
  const { stats, errors, onChange, clearErrors, reset, remove, accept } =
    useFileUpload({
      ...props,
      maxFiles,
      maxFileSize,
      extensions,
    });

  return (
    <Form className={styles.container}>
      <FileUploadErrorModal errors={errors} clearErrors={clearErrors} />
      <Box>
        <FileInput
          accept={accept}
          onChange={onChange}
          multiple={maxFiles > 1}
        />
        <Button onClick={reset} disabled={stats.length === 0}>
          Remove all files
        </Button>
      </Box>
      <div className={styles.progress}>
        <LinearProgress
          aria-label="Upload size limit"
          min={0}
          max={maxFiles}
          value={stats.length}
        />
        <FormMessage theme="none">
          <FormMessageCounter>
            {stats.length} of {maxFiles}
          </FormMessageCounter>
        </FormMessage>
      </div>
      <Box
        grid
        gridColumns="fill"
        gridAutoRows
        align="stretch"
        className={styles.grid}
      >
        {stats.map(({ key, ...uploadStatus }) => (
          <FilePreviewCard
            key={key}
            {...uploadStatus}
            fileKey={key}
            remove={remove}
          />
        ))}
      </Box>
    </Form>
  );
}
