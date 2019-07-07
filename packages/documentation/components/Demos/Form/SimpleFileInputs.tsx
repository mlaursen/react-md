import React, { FC, useState, useCallback, Fragment } from "react";
import { ButtonTheme, ButtonThemeType, ButtonType } from "@react-md/button";
import { Form, FileInput } from "@react-md/form";
import { Text, SrOnly } from "@react-md/typography";

import "./SimpleFileInputs.scss";
import CodeBlock from "components/Code/CodeBlock";

const themes: ButtonTheme[] = [
  "primary",
  "secondary",
  "warning",
  "error",
  "clear",
];
const themeTypes: ButtonThemeType[] = ["flat", "outline", "contained"];
const buttonTypes: ButtonType[] = ["text", "icon"];

const SimpleFileInputs: FC = () => {
  const [file, setFile] = useState("");
  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    event => {
      const [file] = event.currentTarget.files || [null];
      if (file) {
        setFile(file.name);
      }
    },
    []
  );

  return (
    <Fragment>
      <Text type="subtitle-1" margin="none">
        Last selected file:
      </Text>
      <CodeBlock aria-live="polite">{file || "None"}</CodeBlock>
      <Form className="simple-file-inputs">
        {buttonTypes.map(buttonType =>
          themes.map(theme =>
            themeTypes.map(themeType => {
              const id = `file-input-${buttonType}-${theme}-${themeType}`;
              return (
                <FileInput
                  id={id}
                  key={id}
                  name={id}
                  theme={theme}
                  themeType={themeType}
                  buttonType={buttonType}
                  onChange={onChange}
                  disableIconSpacing={buttonType === "icon"}
                >
                  {/* the SrOnly for icon buttons is actually the defaultProp value for children */}
                  {buttonType === "text" ? "Upload" : <SrOnly>Upload</SrOnly>}
                </FileInput>
              );
            })
          )
        )}
      </Form>
    </Fragment>
  );
};

export default SimpleFileInputs;
