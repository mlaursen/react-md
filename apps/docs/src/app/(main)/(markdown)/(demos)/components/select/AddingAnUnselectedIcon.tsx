import { Form } from "@react-md/core/form/Form";
import { Option } from "@react-md/core/form/Option";
import { Select } from "@react-md/core/form/Select";
import RadioButtonCheckedIcon from "@react-md/material-icons/RadioButtonCheckedIcon";
import RadioButtonUncheckedIcon from "@react-md/material-icons/RadioButtonUncheckedIcon";
import { type ReactElement } from "react";

export default function AddingAnUnselectedIcon(): ReactElement {
  return (
    <Form>
      <Select label="Label">
        <Option
          value="a"
          unselectedIcon={<RadioButtonUncheckedIcon />}
          selectedIcon={<RadioButtonCheckedIcon />}
        >
          Option 1
        </Option>
        <Option
          value="b"
          unselectedIcon={<RadioButtonUncheckedIcon />}
          selectedIcon={<RadioButtonCheckedIcon />}
        >
          Option 2
        </Option>
        <Option
          value="c"
          unselectedIcon={<RadioButtonUncheckedIcon />}
          selectedIcon={<RadioButtonCheckedIcon />}
        >
          Option 3
        </Option>
        <Option
          value="d"
          unselectedIcon={<RadioButtonUncheckedIcon />}
          selectedIcon={<RadioButtonCheckedIcon />}
        >
          Option 4
        </Option>
      </Select>
    </Form>
  );
}
