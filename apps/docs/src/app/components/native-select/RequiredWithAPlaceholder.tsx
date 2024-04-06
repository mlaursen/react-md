import { Box, Button, Form, NativeSelect, box } from "react-md";
import { type ReactElement } from "react";

export default function RequiredWithAPlaceholder(): ReactElement {
  return (
    <Form
      className={box({
        justify: "stretch",
        disablePadding: true,
        fullWidth: true,
      })}
    >
      <NativeSelect
        label="Label"
        stretch
        name="choice"
        required
        defaultValue=""
        labelProps={{ floatingActive: true }}
      >
        <option value="" disabled>
          Select an option
        </option>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
        <option>Option 4</option>
      </NativeSelect>
      <Box disablePadding align="start" justify="space-between">
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
