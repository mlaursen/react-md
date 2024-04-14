import { box } from "@react-md/core/box/styles";
import { Form } from "@react-md/core/form/Form";
import { Radio } from "@react-md/core/form/Radio";
import MoodBadOutlinedIcon from "@react-md/material-icons/MoodBadOutlinedIcon";
import MoodOutlinedIcon from "@react-md/material-icons/MoodOutlinedIcon";
import { type ReactElement } from "react";

export default function CustomIcons(): ReactElement {
  return (
    <Form className={box({ stacked: true, align: "start" })}>
      <Radio
        label="Label"
        name="custom"
        icon={<MoodBadOutlinedIcon theme="error" />}
        checkedIcon={<MoodOutlinedIcon theme="success" />}
      />
      <Radio
        label="Label"
        name="custom"
        icon={<MoodBadOutlinedIcon theme="error" />}
        checkedIcon={<MoodOutlinedIcon theme="success" />}
      />
    </Form>
  );
}
