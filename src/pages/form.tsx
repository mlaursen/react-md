import { Button, FloatingActionButton } from "@react-md/button";
import { Box, Typography, useDropzone } from "@react-md/core";
import {
  Checkbox,
  Fieldset,
  FileInput,
  Form,
  InputToggle,
  Legend,
  Radio,
  TextArea,
  TextField,
  useCheckboxGroup,
  useFileUpload,
  useRadioGroup,
} from "@react-md/form";
import type { ReactElement } from "react";
import { Fragment, useState } from "react";

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

function RadioGroup(): ReactElement {
  const { getRadioProps } = useRadioGroup({
    name: "radio-group",
    defaultValue: "",
  });

  return (
    <Fieldset browserStyles>
      <Legend>Radio Group</Legend>
      <Box>
        <Radio {...getRadioProps("a")} label="First" />
        <Radio {...getRadioProps("b")} label="Second" />
        <Radio {...getRadioProps("c")} label="Third" />
        <Radio {...getRadioProps("d")} label="Forth" />
      </Box>
    </Fieldset>
  );
}

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
  const { value: theme, getRadioProps } = useRadioGroup<typeof themes[number]>({
    name: "theme",
    defaultValue: "outline",
  });

  return (
    <Form style={{ marginBottom: "4rem" }}>
      <Box {...handlers}>
        <FileInput
          accept={accept}
          onChange={onChange}
          multiple={maxFiles > 1}
        />
        <Button onClick={() => setActive((p) => !p)}>Toggle</Button>
        {themes.map((themeType) => (
          <Radio
            {...getRadioProps(themeType)}
            key={themeType}
            label={themeType}
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
  const { getCheckboxProps, getIndeterminateProps } = useCheckboxGroup({
    name: "themes",
    values: themes,
  });

  return (
    <Fragment key={key}>
      <Box>
        <Checkbox {...getIndeterminateProps()} label="All" />
        {themes.map((theme) => (
          <Checkbox {...getCheckboxProps(theme)} key={theme} label={theme} />
        ))}
      </Box>
      <Box>
        <label>
          Native
          <input type="checkbox" readOnly />
        </label>
        <InputToggle label="Example" type="checkbox" size="small" />
        <InputToggle label="Example" type="checkbox" size="dense" />
        <InputToggle label="Example" type="checkbox" size="normal" />
        <InputToggle label="Example" type="checkbox" size="large" />
      </Box>
      <Box>
        <InputToggle label="Example" type="checkbox" size="dense" iconAfter />
        <InputToggle label="Example" type="checkbox" size="normal" stacked />
        <InputToggle
          label="Example"
          type="checkbox"
          size="large"
          stacked
          iconAfter
        />
      </Box>
      <Box>
        <InputToggle
          label="Example"
          type="checkbox"
          size="auto"
          style={{ fontSize: 42 }}
        />
        <InputToggle label="Example" type="checkbox" />
        <InputToggle label="Example" type="checkbox" indeterminate checked />
        <InputToggle label="Example" type="checkbox" disabled />
        <InputToggle label="Example" type="checkbox" readOnly />
        <InputToggle label="Example" type="checkbox" defaultChecked />
      </Box>
      <Box>
        <label>
          Native
          <input type="radio" readOnly />
        </label>
        <InputToggle label="Example" type="radio" size="small" />
        <InputToggle label="Example" type="radio" size="dense" />
        <InputToggle label="Example" type="radio" size="normal" />
        <InputToggle label="Example" type="radio" size="large" />
      </Box>
      <Box>
        <InputToggle label="Example" type="radio" size="dense" iconAfter />
        <InputToggle label="Example" type="radio" size="normal" stacked />
        <InputToggle
          label="Example"
          type="radio"
          size="large"
          stacked
          iconAfter
        />
      </Box>
      <Box>
        <InputToggle
          label="Example"
          type="radio"
          size="auto"
          style={{ fontSize: 42 }}
        />
        <InputToggle label="Example" type="radio" />
        <InputToggle label="Example" type="radio" disabled />
        <InputToggle label="Example" type="radio" readOnly />
        <InputToggle label="Example" type="radio" defaultChecked />
      </Box>
      <RadioGroup />
      <Demo />
      <FloatingActionButton onClick={() => setKey((prevKey) => prevKey + 1)}>
        Reset
      </FloatingActionButton>
    </Fragment>
  );
}
