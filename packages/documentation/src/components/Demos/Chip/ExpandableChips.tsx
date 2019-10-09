import React, { FC } from "react";
import { Avatar } from "@react-md/avatar";
import { Chip } from "@react-md/chip";
import { Divider } from "@react-md/divider";
import { Label } from "@react-md/form";
import { AddCircleSVGIcon } from "@react-md/material-icons";
import { Menu, MenuItem } from "@react-md/menu";
import { bem, useToggle } from "@react-md/utils";

import Phone from "components/Phone";

import "./ExpandableChips.scss";

const PERSONAL_EMAIL = "jjeckhart@email.com";
const WORK_EMAIL = "jjeckhart@workemail.com";

const getSrc = (isWork: boolean): string =>
  `https://i.pravatar.cc/40?img=${isWork ? 4 : 3}`;

const block = bem("expandable-chip-example");

const ExpandableChips: FC = () => {
  const [visible, showMenu, hideMenu] = useToggle(false);
  const [isWork, , , toggleWork] = useToggle(false);
  return (
    <Phone id="expandable-chip-phone" contentClassName={block()}>
      <div className={block("header")}>
        <Label htmlFor="to-email" className={block("label")}>
          To
        </Label>
        <Chip
          id="expandable-chip"
          onClick={showMenu}
          className={block("chip")}
          leftIcon={<Avatar src={getSrc(isWork)} />}
        >
          Jonas Eckhart
        </Chip>
        <Menu
          id="expandable-chip-menu"
          aria-labelledby="expandable-chip"
          controlId="expandable-chip"
          visible={visible}
          onRequestClose={hideMenu}
          anchor={{
            x: "inner-left",
            y: "top",
          }}
        >
          <MenuItem
            id="selected-email-item"
            className={block("selection")}
            leftAvatar={<Avatar src={getSrc(isWork)} />}
            secondaryText={isWork ? WORK_EMAIL : PERSONAL_EMAIL}
            rightIcon={<AddCircleSVGIcon className={block("remove")} />}
          >
            Jonas Eckhart
          </MenuItem>
          <MenuItem
            id="other-email-item"
            leftAvatar={<Avatar src={getSrc(!isWork)} />}
            onClick={toggleWork}
          >
            {isWork ? PERSONAL_EMAIL : WORK_EMAIL}
          </MenuItem>
        </Menu>
        <input
          id="email-to"
          type="email"
          name="email"
          placeholder="someone@email.com"
          className={block("field", { email: true })}
        />
      </div>
      <Divider />
      <input
        id="email-title"
        name="title"
        type="text"
        defaultValue="Re: Vacation Request"
        className={block("field")}
      />
      <Divider />
      <textarea
        id="email-message"
        placeholder="Message"
        className={block("field", { area: true })}
      />
    </Phone>
  );
};

export default ExpandableChips;
