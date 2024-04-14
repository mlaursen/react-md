import { states } from "@/constants/states.js";
import { Avatar } from "@react-md/core/avatar/Avatar";
import { Form } from "@react-md/core/form/Form";
import { Option } from "@react-md/core/form/Option";
import { Select } from "@react-md/core/form/Select";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { type ReactElement } from "react";

export default function RenderingWithinASheet(): ReactElement {
  return (
    <Form>
      <Select label="Select a state" menuProps={{ renderAsSheet: true }}>
        {states.map(({ name, abbreviation }) => (
          <Option
            key={abbreviation}
            value={abbreviation}
            leftAddon={<Avatar size="icon">{abbreviation}</Avatar>}
            rightAddon={<FavoriteIcon theme="secondary" />}
          >
            {name}
          </Option>
        ))}
      </Select>
    </Form>
  );
}
