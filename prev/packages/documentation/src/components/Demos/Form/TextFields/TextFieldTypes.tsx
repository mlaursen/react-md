import type { ReactElement } from "react";
import { Divider } from "@react-md/divider";
import type { SupportedInputTypes, FormTheme } from "@react-md/form";
import {
  Form,
  TextField,
  Password,
  Fieldset,
  Radio,
  useChoice,
  FormThemeProvider,
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
const themes: FormTheme[] = ["underline", "filled", "outline"];

export default function TextFieldTypes(): ReactElement {
  const [currentTheme, handleThemeChange] = useChoice<FormTheme>("outline");

  return (
    <FormThemeProvider theme={currentTheme}>
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
          />
        ))}
        <Divider />
        <Password
          id="example-password-field"
          label="Password"
          placeholder="Super secret password"
        />
      </Form>
    </FormThemeProvider>
  );
}
