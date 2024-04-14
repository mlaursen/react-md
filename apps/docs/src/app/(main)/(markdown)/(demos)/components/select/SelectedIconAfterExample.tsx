import { Form } from "@react-md/core/form/Form";
import { Option } from "@react-md/core/form/Option";
import { Select } from "@react-md/core/form/Select";
import { type ReactElement } from "react";

export default function SelectedIconAfterExample(): ReactElement {
  return (
    <Form>
      <Select label="Label">
        <Option value="a" selectedIconAfter>
          Option 1
        </Option>
        <Option value="b" selectedIconAfter>
          Option 2
        </Option>
        <Option value="c" selectedIconAfter>
          Option 3
        </Option>
        <Option value="d" selectedIconAfter>
          Option 4
        </Option>
      </Select>
    </Form>
  );
}
