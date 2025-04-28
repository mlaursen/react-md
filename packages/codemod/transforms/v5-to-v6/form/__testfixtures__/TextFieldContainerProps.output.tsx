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
        leftAddon={<span>Hello!</span>}
        rightAddon={<span>World!</span>}
        disableRightAddonStyles />
      <TextFieldWithMessage
        label="Label"
        leftAddon={<span>Hello!</span>}
        rightAddon={<span>World!</span>} />
      <TextArea
        label="Label"
        leftAddon={<span>Hello!</span>}
        rightAddon={<span>World!</span>}
        disableLeftAddonStyles={!isLeftAddon} />
      <TextAreaWithMessage
        label="Label"
        leftAddon={<span>Hello!</span>}
        rightAddon={<span>World!</span>} />
      <Password
        label="Label"
        leftAddon={<span>Hello!</span>}
        rightAddon={<span>World!</span>} />
      <PasswordWithMessage
        label="Label"
        leftAddon={<span>Hello!</span>}
        rightAddon={<span>World!</span>}
        disableRightAddonStyles={!isRightAddon} />
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
        leftAddon={<span>Hello!</span>}
        rightAddon={<span>World!</span>}
        disableLeftAddonStyles
        disableRightAddonStyles />
    </>
  );
}
