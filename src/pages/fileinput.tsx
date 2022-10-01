import { Box, useDropzone } from "@react-md/core";
import { FileInput, Form, useFileUpload } from "@react-md/form";
import type { ReactElement } from "react";
import { Resettable } from "src/components/Resettable";

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

export default function FileInputPage(): ReactElement {
  const {
    stats: _stats,
    errors: _errors,
    clearErrors: _clearErrors,
    onDrop,
    reset: _reset,
    remove: _remove,
    accept,
    onChange,
  } = useFileUpload({
    maxFiles,
    maxFileSize: FOUR_HUNDRED_MB,
    extensions,
    onChange(_event) {
      // console.log("event:", event);
    },
  });
  const {
    isOver: _isOver,
    isDragging: _isDragging,
    handlers,
  } = useDropzone({
    onDrop,
  });
  return (
    <Resettable>
      <Form>
        <Box {...handlers}>
          <FileInput
            accept={accept}
            onChange={onChange}
            multiple={maxFiles > 1}
          />
        </Box>
      </Form>
    </Resettable>
  );
}
