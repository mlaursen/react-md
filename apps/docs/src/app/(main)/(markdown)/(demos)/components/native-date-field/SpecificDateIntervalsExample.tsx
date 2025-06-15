import { Box } from "@react-md/core/box/Box";
import { box } from "@react-md/core/box/styles";
import { Button } from "@react-md/core/button/Button";
import { NativeDateField } from "@react-md/core/datetime/NativeDateField";
import { Form } from "@react-md/core/form/Form";
import { type ReactElement } from "react";

export default function SpecificDateIntervalsExample(): ReactElement {
  return (
    <Form className={box({ stacked: true, fullWidth: true })}>
      <NativeDateField
        label="Saturdays"
        name="date"
        step={7}
        min="2025-06-07"
      />
      <Box justify="end" fullWidth disablePadding>
        <Button type="reset" theme="warning" themeType="outline">
          Reset
        </Button>
        <Button type="submit" theme="primary" themeType="contained">
          Submit
        </Button>
      </Box>
    </Form>
  );
}
