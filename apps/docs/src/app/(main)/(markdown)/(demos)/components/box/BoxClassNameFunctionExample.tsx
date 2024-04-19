import { box } from "@react-md/core/box/styles";
import { Fieldset } from "@react-md/core/form/Fieldset";
import { Form } from "@react-md/core/form/Form";
import { Legend } from "@react-md/core/form/Legend";
import { TextField } from "@react-md/core/form/TextField";
import { type ReactElement } from "react";

export default function BoxClassNameFunctionExample(): ReactElement {
  return (
    <Form
      className={box({ align: "stretch", stacked: true, disablePadding: true })}
    >
      <Fieldset className={box({ grid: true, gridColumns: 3 })}>
        <Legend>Name</Legend>
        <TextField label="First Name" autoCompleteValue="given-name" required />
        <TextField label="Middle Name" autoCompleteValue="additional-name" />
        <TextField label="Last Name" autoCompleteValue="family-name" required />
      </Fieldset>
    </Form>
  );
}
