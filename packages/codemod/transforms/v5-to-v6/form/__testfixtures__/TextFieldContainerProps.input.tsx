import states from "constants/states";
import { type ReactElement, useState } from "react";
import {
  Password,
  PasswordWithMessage,
  Select,
  TextArea,
  TextAreaWithMessage,
  TextField,
  TextFieldWithMessage,
} from "react-md";

export default function TextFieldContainerProps(): ReactElement {
  const [value, setValue] = useState("");
  const isLeftAddon = true;
  const isRightAddon = false;
  return (
    <>
      <TextField
        label="Label"
        leftChildren={<span>Hello!</span>}
        stretch
        rightChildren={<span>World!</span>}
        isLeftAddon
        isRightAddon={false}
      />
      <TextFieldWithMessage
        stretch
        label="Label"
        leftChildren={<span>Hello!</span>}
        rightChildren={<span>World!</span>}
      />
      <TextArea
        stretch
        label="Label"
        leftChildren={<span>Hello!</span>}
        rightChildren={<span>World!</span>}
        isLeftAddon={isLeftAddon}
        isRightAddon
      />
      <TextAreaWithMessage
        label="Label"
        stretch
        leftChildren={<span>Hello!</span>}
        rightChildren={<span>World!</span>}
      />
      <Password
        label="Label"
        leftChildren={<span>Hello!</span>}
        rightChildren={<span>World!</span>}
        stretch
      />
      <PasswordWithMessage
        label="Label"
        stretch
        leftChildren={<span>Hello!</span>}
        rightChildren={<span>World!</span>}
        isLeftAddon
        isRightAddon={isRightAddon}
      />
      <Select
        id="simple-select-example"
        label="A Label"
        placeholder="Choose..."
        name="select"
        options={states.map(({ abbreviation, name }) => ({
          label: name,
          value: abbreviation,
        }))}
        value={value}
        onChange={(value) => setValue(value)}
        leftChildren={<span>Hello!</span>}
        rightChildren={<span>World!</span>}
        isLeftAddon={false}
        isRightAddon={false}
        stretch
      />
    </>
  );
}
