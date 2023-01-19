import { Box, Button, Form, Option, Select } from "@react-md/core";
import type { ReactElement } from "react";
import { useState } from "react";

type Value = "" | "a" | "b" | "c" | "d";

export function ControlledExample(): ReactElement {
  const [value, setValue] = useState<Value>("");
  const [error, setError] = useState(false);

  return (
    <Form
      onReset={() => {
        setValue("");
        setError(false);
      }}
    >
      <Select
        label="Select an option"
        name="controlled"
        required
        error={error}
        value={value}
        onChange={(event) => {
          setError(false);
          setValue(event.currentTarget.value);
        }}
        onInvalid={() => setError(true)}
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
