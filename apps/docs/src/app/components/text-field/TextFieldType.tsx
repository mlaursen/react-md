import { Form, TextField, box } from "react-md";
import { type ReactElement } from "react";

export default function TextFieldType(): ReactElement {
  return (
    <Form className={box({ stacked: true, fullWidth: true, align: "start" })}>
      <TextField label="Text" type="text" />
      <TextField label="Password" type="password" />
      <TextField label="Number" type="number" />
      <TextField label="Tel" type="tel" />
      <TextField label="Email" type="email" />
      <TextField label="Date" type="date" />
      <TextField label="Time" type="time" />
      <TextField label="Datetime-local" type="datetime-local" />
      <TextField label="Url" type="url" />
      <TextField label="Color" type="color" />
      <TextField label="Search" type="search" />
    </Form>
  );
}
