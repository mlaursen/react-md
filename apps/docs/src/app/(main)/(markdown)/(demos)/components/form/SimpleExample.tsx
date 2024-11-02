"use client";
import { box } from "@react-md/core/box/styles";
import { Button } from "@react-md/core/button/Button";
import { Form } from "@react-md/core/form/Form";
import { TextField } from "@react-md/core/form/TextField";
import { type ReactElement } from "react";

export default function SimpleExample(): ReactElement {
  return (
    <Form
      onSubmit={() => {
        // eslint-disable-next-line no-console
        console.log("Submitted!");
      }}
      className={box({ stacked: true, align: "start" })}
    >
      <TextField
        label="Some input"
        name="example"
        required
        placeholder="John Doe"
      />
      <Button type="submit" theme="primary" themeType="contained">
        Submit
      </Button>
    </Form>
  );
}
