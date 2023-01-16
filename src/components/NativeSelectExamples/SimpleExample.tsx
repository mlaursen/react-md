import { Form, NativeSelect } from "@react-md/form";
import type { ReactElement } from "react";

export function SimpleExample(): ReactElement {
  return (
    <Form>
      <NativeSelect label="Label">
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
        <option>Option 4</option>
      </NativeSelect>
    </Form>
  );
}
