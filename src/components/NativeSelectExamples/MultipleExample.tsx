import { Box, Button } from "@react-md/core";
import { Form, NativeSelect } from "@react-md/form";
import type { ReactElement } from "react";
import { states } from "src/constants/states";

export function MultipleExample(): ReactElement {
  return (
    <Form>
      <NativeSelect
        label="Select a state"
        name="state"
        required
        multiple
        size={8}
      >
        <option value="" disabled hidden />
        {states.map(({ name, abbreviation }) => (
          <option key={abbreviation} value={abbreviation}>
            {name}
          </option>
        ))}
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
