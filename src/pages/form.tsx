import { Button } from "@react-md/button";
import { Box, useDropzone } from "@react-md/core";
import { FileInput, TextField, useFileUpload } from "@react-md/form";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import LocationOnIcon from "@react-md/material-icons/LocationOnIcon";
import type { ReactElement } from "react";
import { useState } from "react";

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

export default function FormPage(): ReactElement {
  const {
    stats,
    errors,
    clearErrors,
    onDrop,
    reset,
    remove,
    accept,
    onChange,
  } = useFileUpload({
    maxFiles,
    maxFileSize: FOUR_HUNDRED_MB,
    extensions,
    onChange(event) {
      console.log("event:", event);
    },
  });
  const { isOver, isDragging, handlers } = useDropzone({
    onDrop,
  });
  // console.log("stats:", stats);
  const [active, setActive] = useState(false);

  return (
    <Box {...handlers}>
      <FileInput accept={accept} onChange={onChange} multiple={maxFiles > 1} />
      <Button onClick={() => setActive((p) => !p)}>Toggle</Button>
      <TextField
        label="Example"
        placeholder="Placeholder"
        active={active}
        messageProps={{ children: "Hello" }}
        leftAddon={<FavoriteIcon />}
        rightAddon={<LocationOnIcon />}
      />
    </Box>
  );
}
