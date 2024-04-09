import { Checkbox } from "@react-md/core/form/Checkbox";
import { Form } from "@react-md/core/form/Form";
import MoodBadOutlinedIcon from "@react-md/material-icons/MoodBadOutlinedIcon";
import MoodOutlinedIcon from "@react-md/material-icons/MoodOutlinedIcon";
import SocialDistanceOutlinedIcon from "@react-md/material-icons/SocialDistanceOutlinedIcon";
import { type ReactElement } from "react";

export default function CustomIcons(): ReactElement {
  return (
    <Form>
      <Checkbox
        label="Label"
        indeterminate={false}
        icon={<MoodBadOutlinedIcon theme="error" />}
        checkedIcon={<MoodOutlinedIcon theme="success" />}
        indeterminateIcon={<SocialDistanceOutlinedIcon theme="warning" />}
      />
    </Form>
  );
}
