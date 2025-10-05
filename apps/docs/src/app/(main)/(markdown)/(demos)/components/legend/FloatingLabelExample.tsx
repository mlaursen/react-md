import { box, boxStyles } from "@react-md/core/box/styles";
import { Fieldset } from "@react-md/core/form/Fieldset";
import { Form } from "@react-md/core/form/Form";
import { Legend } from "@react-md/core/form/Legend";
import { TextField } from "@react-md/core/form/TextField";
import { type ReactElement } from "react";

export default function FloatingLabelExample(): ReactElement {
  return (
    <Form className={box({ fullWidth: true })}>
      <Fieldset
        floatingLegend
        {...boxStyles({
          grid: true,
          fullWidth: true,
          gridColumns: { phone: 1 },
          gridItemSize: { tablet: "8rem" },
        })}
      >
        <Legend floating>I am legend</Legend>
        <TextField placeholder="Field 1" />
        <TextField placeholder="Field 2" />
        <TextField placeholder="Field 3" />
      </Fieldset>
    </Form>
  );
}
