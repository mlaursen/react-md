import type { ReactElement } from "react";
import { Button } from "@react-md/button";
import { useFileUpload, FileInput, Form } from "@react-md/form";
import { GridList } from "@react-md/utils";

import PreviewFile from "./PreviewFile";
import ErrorModal from "./ErrorModal";

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
const maxFiles = 4;

export default function SimpleFileUpload(): ReactElement | null {
  const { stats, errors, onChange, clearErrors, reset, remove, accept } =
    useFileUpload({
      maxFiles,
      maxFileSize: FOUR_HUNDRED_MB,
      extensions,
    });

  return (
    <Form>
      <FileInput
        id="simple-file-upload-input"
        accept={accept}
        onChange={onChange}
        multiple={maxFiles > 1}
      />
      {stats.length > 0 && <Button onClick={reset}>Remove all files</Button>}
      <ErrorModal errors={errors} clearErrors={clearErrors} />
      <GridList maxCellSize={500}>
        {stats.map(({ key, ...uploadStat }, i) => (
          <PreviewFile
            id={`simple-file-upload-preview-${i + 1}`}
            key={key}
            {...uploadStat}
            fileKey={key}
            remove={remove}
          />
        ))}
      </GridList>
    </Form>
  );
}
