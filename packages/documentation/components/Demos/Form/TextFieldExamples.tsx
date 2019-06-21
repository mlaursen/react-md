import React, { FC } from "react";
import { TextField, PasswordField, Form } from "@react-md/form";
import { InfoOutlineSVGIcon, PhoneSVGIcon } from "@react-md/material-icons";

const TextFieldExamples: FC = () => (
  <Form className="form-container">
    <TextField
      id="text-field-1"
      placeholder="Placeholder"
      label="Label"
      theme="underline"
      leftChildren={<PhoneSVGIcon />}
      rightChildren={<InfoOutlineSVGIcon />}
    />
    <TextField
      id="text-field-2"
      placeholder="Placeholder"
      label="Label"
      theme="filled"
      leftChildren={<PhoneSVGIcon />}
      rightChildren={<InfoOutlineSVGIcon />}
    />
    <TextField
      id="text-field-3"
      placeholder="Placeholder"
      label="Label"
      theme="outline"
      leftChildren={<PhoneSVGIcon />}
      rightChildren={<InfoOutlineSVGIcon />}
    />
    <PasswordField
      id="password-1"
      name="password"
      label="Password"
      placeholder="Password"
      inline
    />
  </Form>
);

export default TextFieldExamples;
