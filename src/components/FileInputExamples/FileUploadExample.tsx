import { Button } from "@react-md/button";
import { Box } from "@react-md/core";
import {
  FileInput,
  Form,
  FormMessage,
  FormMessageCounter,
  useFileUpload,
} from "@react-md/form";
import { LinearProgress } from "@react-md/progress";
import type { ReactElement } from "react";
import { FilePreview } from "../FilePreview";
import { FileUploadErrorModal } from "../FileUploadErrorModal";
import styles from "./FileUploadExample.module.scss";

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

const FOUR_HUNDRED_MB = 400 * 1024 * 1024;
const maxFiles = 10;

export function FileUploadExample(): ReactElement {
  const { stats, errors, onChange, clearErrors, reset, remove, accept } =
    useFileUpload({
      maxFiles,
      maxFileSize: FOUR_HUNDRED_MB,
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
