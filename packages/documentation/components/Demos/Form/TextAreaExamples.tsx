import React, { FC } from "react";
import { TextArea } from "@react-md/form";
import { Divider } from "@react-md/divider";
import Container from "./Container";

const TextAreaExamples: FC = () => {
  return (
    <Container>
      <TextArea
        id="text-area-1"
        placeholder="Placeholder"
        label="Label"
        theme="underline"
      />
      <Divider />
      <TextArea
        id="text-area-2"
        placeholder="Placeholder"
        label="Label"
        theme="filled"
      />
      <Divider />
      <TextArea
        id="text-area-3"
        placeholder="Placeholder"
        label="Label"
        theme="outline"
      />
      <Divider />
      <TextArea
        id="text-area-4"
        placeholder="Placeholder"
        label="Label"
        theme="underline"
        resize="vertical"
      />
      <Divider />
      <TextArea
        id="text-area-5"
        placeholder="Placeholder"
        label="Label"
        theme="filled"
        resize="horizontal"
      />
      <Divider />
      <TextArea
        id="text-area-6"
        placeholder="Placeholder"
        label="Label"
        theme="outline"
        resize="both"
      />
    </Container>
  );
};

export default TextAreaExamples;
