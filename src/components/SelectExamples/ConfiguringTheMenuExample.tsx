import { Avatar, BELOW_INNER_LEFT_ANCHOR, Box, Button } from "@react-md/core";
import { Form, Option, Select } from "@react-md/form";
import type { ReactElement } from "react";
import { states } from "src/constants/states";

export function ConfiguringTheMenuExample(): ReactElement {
  return (
    <Form>
      <Select
        label="Select a state"
        menuProps={{
          width: "equal",
          menuStyle: { maxHeight: "20rem" },
          anchor: BELOW_INNER_LEFT_ANCHOR,
          preventOverlap: true,
        }}
      >
        {states.map(({ name, abbreviation }, i) => (
          <Option
            key={abbreviation}
            value={abbreviation}
            leftAddon={<Avatar size="icon">{name[0]}</Avatar>}
            disabled={i % 7 === 0}
            // this allows the name to line-wrap instead of being ellipsis-ed if
            // too long
            disableTextChildren
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
