import { Button, FloatingActionButton } from "@react-md/button";
import { Box, Typography, useDropzone } from "@react-md/core";
import type { FormTheme } from "@react-md/form";
import {
  FileInput,
  Form,
  TextArea,
  TextField,
  useFileUpload,
} from "@react-md/form";
import type { ReactElement } from "react";
import { useState } from "react";
import { TempRadio } from "src/components/TempRadio";

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

const inputTypes = [
  "text",
  "password",
  "number",
  "tel",
  "email",
  "date",
  "time",
  "datetime-local",
  "url",
  "color",
  "search",
] as const;

const themes = ["none", "underline", "filled", "outline"] as const;

function Demo(): ReactElement {
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
  const [active, setActive] = useState(false);
  const [theme, setTheme] = useState<FormTheme>("outline");

  return (
    <Form>
      <Box {...handlers}>
        <FileInput
          accept={accept}
          onChange={onChange}
          multiple={maxFiles > 1}
        />
        <Button onClick={() => setActive((p) => !p)}>Toggle</Button>
        {themes.map((themeType) => (
          <TempRadio
            key={themeType}
            value={themeType}
            label={themeType}
            checked={themeType === theme}
            onChange={() => setTheme(themeType)}
          />
        ))}
        <Typography type="headline-4" style={{ width: "100%" }}>
          {theme}
        </Typography>
        {inputTypes.map((type) => (
          <TextField
            key={type}
            label={`Example ${type}`}
            type={type}
            theme={theme}
            placeholder="Placeholder"
            active={active}
            messageProps={{ children: "Hello" }}
            // leftAddon={<FavoriteIcon />}
            // rightAddon={<LocationOnIcon />}
          />
        ))}
        <TextArea label="Label" placeholder="Placeholder" theme={theme} />
      </Box>
    </Form>
  );
}

export default function FormPage(): ReactElement {
  const [key, setKey] = useState(0);

  return (
    <>
      <FloatingActionButton onClick={() => setKey((prevKey) => prevKey + 1)}>
        Reset
      </FloatingActionButton>
      <Demo key={key} />
    </>
  );
}
