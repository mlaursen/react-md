import React, { FC, useState } from "react";
import { Avatar } from "@react-md/avatar";
import { Chip } from "@react-md/chip";
import { Label, TextArea, TextField } from "@react-md/form";
import { AddCircleSVGIcon } from "@react-md/material-icons";
import { Menu, MenuItem } from "@react-md/menu";
import { useToggle } from "@react-md/utils";

import Phone from "components/Phone";

import "./expandable-chips.scss";

const PERSONAL_EMAIL = "jjeckhart@email.com";
const WORK_EMAIL = "jjeckhart@workemail.com";

const getSrc = (isWork: boolean) =>
  `https://i.pravatar.cc/40?img=${isWork ? 4 : 3}`;

const ExpandableChips: FC = () => {
  const { toggled, enable, disable } = useToggle(false);
  const [isWork, setIsWork] = useState(false);
  return (
    <Phone
      id="expandable-chip-phone"
      contentClassName="expandable-chip-content"
    >
      <div className="expandable-chip-row">
        <Label htmlFor="to-email">To</Label>
        <Chip
          id="expandable-chip"
          onClick={enable}
          className="expandable-chip-inline"
          leftIcon={<Avatar src={getSrc(isWork)} />}
        >
          Jonas Eckhart
        </Chip>
        <Menu
          id="expandable-chip-menu"
          aria-labelledby="expandable-chip"
          controlId="expandable-chip"
          visible={toggled}
          onRequestClose={disable}
          anchor={{
            x: "inner-left",
            y: "top",
          }}
        >
          <MenuItem
            id="selected-email-item"
            className="expandable-chip-item-selected"
            leftAvatar={<Avatar src={getSrc(isWork)} />}
            secondaryText={isWork ? WORK_EMAIL : PERSONAL_EMAIL}
            rightIcon={
              <AddCircleSVGIcon
                style={{
                  transform: "rotate(45deg)",
                  WebkitTransform: "rotate(45deg)",
                }}
              />
            }
          >
            Jonas Eckhart
          </MenuItem>
          <MenuItem
            id="other-email-item"
            leftAvatar={<Avatar src={getSrc(!isWork)} />}
            onClick={() => setIsWork(!isWork)}
          >
            {isWork ? PERSONAL_EMAIL : WORK_EMAIL}
          </MenuItem>
        </Menu>
        <TextField
          id="to-email"
          theme="none"
          type="email"
          className="expandable-chip-field"
        />
      </div>
      <div className="expandable-chip-row">
        <TextField
          id="re-email"
          theme="none"
          defaultValue="Re: Vacation Request"
        />
      </div>
      <TextArea
        id="message-email"
        placeholder="Message"
        theme="none"
        resize="none"
        className="expandable-chip-area"
      />
    </Phone>
  );
};

export default ExpandableChips;
