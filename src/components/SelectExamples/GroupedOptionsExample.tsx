import {
  box,
  Form,
  OptGroup,
  Option,
  Select,
  typography,
} from "@react-md/core";
import type { ReactElement } from "react";

export function GroupedOptionsExample(): ReactElement {
  return (
    <Form className={box({ stacked: true, align: "stretch" })}>
      <Select label="Select a fruit">
        <OptGroup label="A">
          <Option value="apple">Apple</Option>
          <Option value="appricot">Appricot</Option>
          <Option value="avacado">Avacado</Option>
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
                weight: "bold",
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
