import { Box } from "@react-md/core/box/Box";
import { box } from "@react-md/core/box/styles";
import { Button } from "@react-md/core/button/Button";
import { NativeDateField } from "@react-md/core/datetime/NativeDateField";
import { Form } from "@react-md/core/form/Form";
import { type ReactElement } from "react";

export default function MinAndMaxDateExample(): ReactElement {
  return (
    <Form className={box({ stacked: true, fullWidth: true })}>
      <NativeDateField
        label="Appointment"
        min="2025-06-01"
        max="2025-06-30"
        name="appointment"
        required
      />
      <Box align="start" fullWidth disablePadding>
        <Button type="reset" theme="warning" themeType="outline">
          Reset
        </Button>
        <Button type="submit" theme="primary" themeType="contained">
          Confirm
        </Button>
      </Box>
    </Form>
  );
}
