import { Avatar, Box, Button, Form, Option, Select } from "@react-md/core";
import type { ReactElement } from "react";
import { states } from "src/constants/states";

export function WithDisabledOptions(): ReactElement {
  return (
    <Form>
      <Select label="Select a state">
        {states.map(({ name, abbreviation }, i) => (
          <Option
            key={abbreviation}
            value={abbreviation}
            leftAddon={<Avatar size="icon">{name[0]}</Avatar>}
            disabled={i % 7 === 0}
          >
            {name}
          </Option>
        ))}
      </Select>
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
