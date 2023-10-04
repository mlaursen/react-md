import { states } from "@/constants/states.js";
import { Box, Button, Form, NativeSelect } from "@react-md/core";
import { type ReactElement } from "react";

export default function MultiselectExample(): ReactElement {
  return (
    <Form>
      <NativeSelect
        label="Select a state"
        name="state"
        required
        multiple
        size={8}
        theme="underline"
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
