import { Box, Button } from "@react-md/core";
import { Form, Option, Select } from "@react-md/form";
import type { ReactElement } from "react";

export function WithFormMessageExamples(): ReactElement {
  return (
    <Form>
      <Select
        label="Select an option"
        name="state"
        defaultValue="a"
        messageProps={{
          children: "Help Text!",
        }}
      >
        <Option value="a">Option 1</Option>
        <Option value="b">Option 2</Option>
        <Option value="c">Option 3</Option>
        <Option value="d">Option 4</Option>
      </Select>
      <Select
        label="Select an option"
        name="state"
        error
        defaultValue="a"
        messageProps={{
          error: true,
          children: "Error text!",
        }}
      >
        <Option value="a">Option 1</Option>
        <Option value="b">Option 2</Option>
        <Option value="c">Option 3</Option>
        <Option value="d">Option 4</Option>
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
