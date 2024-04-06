import { Form, OptGroup, Option, Select, typography } from "react-md";
import { type ReactElement } from "react";

export default function SelectionGroupsExample(): ReactElement {
  return (
    <Form>
      <Select label="Select a fruit">
        <OptGroup label="A">
          <Option value="apple">Apple</Option>
          <Option value="apricot">Apricot</Option>
          <Option value="avocado">Avocado</Option>
        </OptGroup>
        <OptGroup label="B">
          <Option value="blueberry">Blueberry</Option>
        </OptGroup>
        <OptGroup
          label={
            <span
              className={typography({
                type: null,
                fontStyle: "italic",
                fontWeight: "bold",
              })}
            >
              C
            </span>
          }
        >
          <Option value="cranberry">Cranberry</Option>
          <Option value="currant">Currant</Option>
        </OptGroup>
      </Select>
    </Form>
  );
}
