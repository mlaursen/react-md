import type { FileUploadOptions } from "@react-md/core";
import {
  Box,
  Button,
  FileInput,
  Form,
  FormMessage,
  FormMessageCounter,
  LinearProgress,
  useFileUpload,
} from "@react-md/core";
import type { ReactElement } from "react";
import { FilePreview } from "../FilePreview";
import { FileUploadErrorModal } from "../FileUploadErrorModal";
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

export function FileUploadExample(props: FileUploadExampleProps): ReactElement {
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
        <Button onClick={reset} disabled={!stats.length}>
          Remove all files
        </Button>
      </Box>
      <div className={styles.progress}>
        <LinearProgress min={0} max={maxFiles} value={stats.length} />
        <FormMessage theme="none">
          <FormMessageCounter>
            {stats.length} of {maxFiles}
          </FormMessageCounter>
        </FormMessage>
      </div>
      <Box grid gridColumns="fill" align="start">
        {stats.map(({ key, ...uploadStatus }) => (
          <FilePreview
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
