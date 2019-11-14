import React, { FC } from "react";
import { TextIconSpacing } from "@react-md/icon";
import { ArrowDropDownSVGIcon } from "@react-md/material-icons";
import { DropdownMenu } from "@react-md/menu";

import Version1MenuItem from "./Version1MenuItem";

const NavHeaderTitle: FC = () => (
  <TextIconSpacing icon={<span>react-md</span>}>
    <DropdownMenu
      id="version-picker"
      items={[<Version1MenuItem small />]}
      dropdownIcon={<ArrowDropDownSVGIcon />}
      anchor={{ x: "inner-right", y: "below" }}
    >
      @v2
    </DropdownMenu>
  </TextIconSpacing>
);

export default NavHeaderTitle;
