import { Box, Button, Form, NativeSelect, box } from "@react-md/core";
import { type ReactElement } from "react";

export default function RequiredNativeSelect(): ReactElement {
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
      >
        <option value="" disabled hidden />
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
        <option>Option 4</option>
      </NativeSelect>
      <Box disablePadding align="start">
        <Button type="submit" theme="primary" themeType="contained">
          Submit
        </Button>
      </Box>
    </Form>
  );
}
