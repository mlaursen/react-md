import { Box } from "@react-md/core/box/Box";
import { box } from "@react-md/core/box/styles";
import { Button } from "@react-md/core/button/Button";
import { NativeTimeField } from "@react-md/core/datetime/NativeTimeField";
import { Form } from "@react-md/core/form/Form";
import { type ReactElement } from "react";

export default function SpecificTimeIntervalsExample(): ReactElement {
  return (
    <Form className={box({ stacked: true, fullWidth: true })}>
      <NativeTimeField
        label="Time"
        name="time"
        min="08:00"
        max="17:00"
        step={{ minutes: 15 }}
        required
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
