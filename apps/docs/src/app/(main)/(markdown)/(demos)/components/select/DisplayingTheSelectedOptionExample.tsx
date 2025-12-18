import { Form } from "@react-md/core/form/Form";
import { Option } from "@react-md/core/form/Option";
import {
  type GetSelectedOptionChildrenOptions,
  Select,
} from "@react-md/core/form/Select";
import { type ReactElement, type ReactNode } from "react";

const getSelectedOptionChildren = (
  // `<string>` can be replaced with the `Select` value type if known
  options: GetSelectedOptionChildrenOptions<string>
): ReactNode => {
  const {
    // current value
    value,

    // current option if there is a match with the value
    option,

    // if a placeholder prop was provided
    placeholder,

    // this is the `selectedOptionProps.children` if it was provided
    children,
  } = options;

  if (!value || !option) {
    return placeholder;
  }

  if (value === "a") {
    return <span>This overrides Option 1</span>;
  }

  if (value === "b") {
    return children;
  }

  return option.children;
};

export default function DisplayingTheSelectedOptionExample(): ReactElement {
  return (
    <Form>
      <Select
        label="Label"
        placeholder="Choose..."
        selectedOptionProps={{
          children:
            "This could be used as well. But only useful when the `value` is controlled.",
        }}
        getSelectedOptionChildren={getSelectedOptionChildren}
      >
        <Option value="a">Option 1</Option>
        <Option value="b">Option 2</Option>
        <Option value="c">Option 3</Option>
        <Option value="d">Option 4</Option>
      </Select>
    </Form>
  );
}
