import { Box, Button } from "@react-md/core";
import { Form, NativeSelect } from "@react-md/form";
import type { ReactElement } from "react";

export function WithMessagingExample(): ReactElement {
  return (
    <Form>
      <NativeSelect
        label="Help Text"
        required
        name="required"
        messageProps={{
          children: "Help Text",
        }}
      >
        <option value="" disabled>
          Select an option
        </option>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
        <option>Option 4</option>
      </NativeSelect>
      <NativeSelect
        label="Error State"
        error
        required
        name="required"
        messageProps={{
          error: true,
          children: "This field is required!",
        }}
      >
        <option value="" disabled>
          Select an option
        </option>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
        <option>Option 4</option>
      </NativeSelect>
      <Box justify="space-between">
        <Button type="reset" theme="warning">
          Reset
        </Button>
        <Button type="submit" theme="primary">
          Submit
        </Button>
      </Box>
    </Form>
  );
}
