import { Form, NativeSelect, box } from "react-md";
import { type ReactElement } from "react";

export default function SimpleNativeSelect(): ReactElement {
  return (
    <Form
      className={box({
        justify: "stretch",
        disablePadding: true,
        fullWidth: true,
      })}
    >
      <NativeSelect label="Label" stretch>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
        <option>Option 4</option>
      </NativeSelect>
    </Form>
  );
}
