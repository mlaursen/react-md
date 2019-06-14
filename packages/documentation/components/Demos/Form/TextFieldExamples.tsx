import React, { FC } from "react";
import { TextField, TextArea } from "@react-md/form";
import Container from "./Container";

const TextFieldExamples: FC = () => (
  <Container>
    <TextField
      id="text-field-1"
      placeholder="Placeholder"
      label="Label"
      theme="underline"
    />
    <TextField
      id="text-field-2"
      placeholder="Placeholder"
      label="Label"
      theme="filled"
    />
    <TextField
      id="text-field-3"
      placeholder="Placeholder"
      label="Label"
      theme="outline"
    />
    <TextArea
      id="text-area-1"
      placeholder="Placeholder"
      label="Label"
      theme="underline"
    />
    <TextArea
      id="text-area-2"
      placeholder="Placeholder"
      label="Label"
      theme="filled"
    />
    <TextArea
      id="text-area-3"
      placeholder="Placeholder"
      label="Label"
      theme="outline"
    />
  </Container>
);

export default TextFieldExamples;
