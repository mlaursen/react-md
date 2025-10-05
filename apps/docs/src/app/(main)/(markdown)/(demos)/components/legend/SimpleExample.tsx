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
        <Legend>I am legend</Legend>
        <Box>
          <TextField label="Field 1" />
          <TextField label="Field 2" />
          <TextField label="Field 3" />
        </Box>
      </Fieldset>
    </Form>
  );
}
