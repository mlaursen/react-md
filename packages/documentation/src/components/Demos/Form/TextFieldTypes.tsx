import React, { FC } from "react";
import { Divider } from "@react-md/divider";
import {
  Form,
  SupportedInputTypes,
  TextField,
  Password,
  TextFieldTheme,
  Fieldset,
  Radio,
  useChoice,
} from "@react-md/form";

import styles from "./TextFieldTypes.module.scss";

const types: SupportedInputTypes[] = [
  "password",
  "number",
  "tel",
  "email",
  "date",
  "time",
  "datetime-local",
  "month",
  "week",
  "url",
];
const themes: TextFieldTheme[] = ["underline", "filled", "outline"];

const TextFieldTypes: FC = () => {
  const [currentTheme, handleThemeChange] = useChoice<TextFieldTheme>(
    "outline"
  );

  return (
    <Form className={styles.container}>
      <Fieldset legend="Text field theme">
        {themes.map((theme) => (
          <Radio
            id={`text-field-types-theme-${theme}`}
            key={theme}
            name="theme"
            onChange={handleThemeChange}
            value={theme}
            checked={currentTheme === theme}
            label={theme}
          />
        ))}
      </Fieldset>
      {types.map((type) => (
        <TextField
          id={`text-field-type-${type}`}
          key={type}
          type={type}
          placeholder="Placeholder"
          label={type}
          theme={currentTheme}
        />
      ))}
      <Divider />
      <Password
        id="example-password-field"
        label="Password"
        placeholder="Super secret password"
        theme={currentTheme}
      />
    </Form>
  );
};

export default TextFieldTypes;
