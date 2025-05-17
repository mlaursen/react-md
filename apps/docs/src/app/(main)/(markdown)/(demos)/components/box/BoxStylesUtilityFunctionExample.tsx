import { boxStyles } from "@react-md/core/box/styles";
import { Fieldset } from "@react-md/core/form/Fieldset";
import { Form } from "@react-md/core/form/Form";
import { Legend } from "@react-md/core/form/Legend";
import { TextField } from "@react-md/core/form/TextField";
import { type ReactElement } from "react";

export default function BoxStylesUtilityFunctionExample(): ReactElement {
  return (
    <Form>
      <Fieldset
        {...boxStyles({
          grid: true,
          gridColumns: { phone: 1, desktop: 3 },
          gridItemSize: { tablet: "12rem" },
        })}
      >
        <Legend style={{ marginBottom: "1em" }}>Name</Legend>
        <TextField label="First Name" autoCompleteValue="given-name" required />
        <TextField label="Middle Name" autoCompleteValue="additional-name" />
        <TextField label="Last Name" autoCompleteValue="family-name" required />
      </Fieldset>
    </Form>
  );
}
