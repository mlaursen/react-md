import { Box } from "@react-md/core/box/Box";
import { box } from "@react-md/core/box/styles";
import { Button } from "@react-md/core/button/Button";
import { NativeTimeField } from "@react-md/core/datetime/NativeTimeField";
import { Form } from "@react-md/core/form/Form";
import { type ReactElement } from "react";

export default function MinAndMaxTimeExample(): ReactElement {
  return (
    <Form className={box({ stacked: true, fullWidth: true })}>
      <NativeTimeField
        label="Appointment time"
        min="09:00"
        max="18:00"
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
