import { states } from "@/constants/states.js";
import { Box } from "@react-md/core/box/Box";
import { Button } from "@react-md/core/button/Button";
import { Form } from "@react-md/core/form/Form";
import { NativeSelect } from "@react-md/core/form/NativeSelect";
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
