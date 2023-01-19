import { Box, box, Button } from "@react-md/core";
import { Form, NativeSelect } from "@react-md/form";
import type { ReactElement } from "react";

export function RequiredExample(): ReactElement {
  return (
    <Form
      style={{ width: "100%", maxWidth: "22rem" }}
      className={box({ stacked: true, align: "stretch" })}
    >
      <NativeSelect
        label="Required (hidden default value)"
        name="required1"
        required
        defaultValue=""
      >
        <option value="" disabled hidden />
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
        <option>Option 4</option>
      </NativeSelect>
      <NativeSelect
        label="Required (visible default value)"
        name="required2"
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
