import React, { FC, Fragment, useCallback, useState } from "react";
import { ButtonTheme, ButtonThemeType } from "@react-md/button";
import { Divider } from "@react-md/divider";
import {
  Checkbox,
  Fieldset,
  FileInput,
  Form,
  Radio,
  useCheckboxState,
  useChoice,
} from "@react-md/form";
import { SrOnly, Text } from "@react-md/typography";

import CodeBlock from "components/Code/CodeBlock";

import "./FileInputExample.scss";

const themes: ButtonTheme[] = [
  "primary",
  "secondary",
  "warning",
  "error",
  "clear",
];
const themeTypes: ButtonThemeType[] = ["flat", "outline", "contained"];

const SimpleFileInputs: FC = () => {
  const [file, setFile] = useState("");
  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    event => {
      const [file] = Array.from(event.currentTarget.files || [null]);
      if (file) {
        setFile(file.name);
      }
    },
    []
  );

  const [theme, handleThemeChange] = useChoice<ButtonTheme>("clear");
  const [themeType, handleTypeChange] = useChoice<ButtonThemeType>("flat");
  const [isIcon, handleIconChange] = useCheckboxState(false);

  return (
    <Fragment>
      <Text type="subtitle-1" margin="none">
        Last selected file:
      </Text>
      <CodeBlock aria-live="polite">{file || "None"}</CodeBlock>
      <Form className="file-input-example">
        <Fieldset legend="Theme" disableLegendSROnly>
          {themes.map(t => (
            <Radio
              id={`text-theme-${t}`}
              key={t}
              name="theme"
              onChange={handleThemeChange}
              value={t}
              checked={theme === t}
              label={t}
            />
          ))}
        </Fieldset>
        <Fieldset legend="Theme type" disableLegendSROnly>
          {themeTypes.map(type => (
            <Radio
              id={`text-theme-${type}`}
              key={type}
              name="type"
              onChange={handleTypeChange}
              value={type}
              checked={themeType === type}
              label={type}
            />
          ))}
        </Fieldset>
        <Checkbox
          id="file-input-icon"
          label="Icon Button"
          name="iconButton"
          checked={isIcon}
          onChange={handleIconChange}
        />
        <Divider />
        <FileInput
          id="configurable-file-input"
          onChange={onChange}
          theme={theme}
          themeType={themeType}
          buttonType={isIcon ? "icon" : "text"}
          disableIconSpacing={isIcon}
        >
          {/* the SrOnly for icon buttons is actually the defaultProp value for children */}
          {isIcon ? <SrOnly>Upload</SrOnly> : "Upload"}
        </FileInput>
      </Form>
    </Fragment>
  );
};

export default SimpleFileInputs;
