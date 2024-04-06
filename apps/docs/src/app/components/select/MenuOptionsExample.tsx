import { Form, Option, Select } from "react-md";
import { type ReactElement } from "react";

export default function MenuOptionsExample(): ReactElement {
  return (
    <Form>
      <Select
        label="Label"
        menuProps={{
          // this is the default
          // width: "min",
          // width: "auto",
          width: "equal",
          preventOverlap: true,
        }}
      >
        <Option value="a">Option 1</Option>
        <Option value="b" height="auto" disableTextChildren>
          Donec sed pulvinar mauris. Mauris pretium placerat tellus, ut
          sollicitudin leo vestibulum eget. Proin ullamcorper metus congue nunc
          semper ullamcorper. Curabitur vel nisl tortor. Cras ultricies a ex sed
          aliquam. Pellentesque ultricies tortor cursus enim dapibus molestie.
          Cras auctor nisi eu augue iaculis sagittis. Etiam posuere augue vitae
          lobortis sollicitudin. Mauris placerat neque at nisl vehicula, in
          pulvinar felis consectetur. Ut accumsan faucibus ultricies. In
          pharetra faucibus iaculis.
        </Option>
        <Option value="c">Option 3</Option>
        <Option value="d">Option 4</Option>
      </Select>
    </Form>
  );
}
