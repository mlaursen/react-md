import { Box } from "@react-md/core/box/Box";
import { Fieldset } from "@react-md/core/form/Fieldset";
import { Form } from "@react-md/core/form/Form";
import { Legend } from "@react-md/core/form/Legend";
import { TextField } from "@react-md/core/form/TextField";
import { type ReactElement } from "react";

export default function SimpleExample(): ReactElement {
  return (
    <Form>
      <Fieldset>
        <Legend>Name</Legend>
        <Box grid gridColumns={1}>
          <TextField
            label="First Name"
            autoCompleteValue="given-name"
            required
          />
          <TextField label="Middle Name" autoCompleteValue="additional-name" />
          <TextField
            label="Last Name"
            autoCompleteValue="family-name"
            required
          />
        </Box>
      </Fieldset>
    </Form>
  );
}
