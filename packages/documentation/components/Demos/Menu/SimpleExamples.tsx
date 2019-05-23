import React, { FunctionComponent } from "react";
import { DropdownMenu } from "@react-md/menu";

import Container from "./Container";
import { HomeSVGIcon, MoreVertSVGIcon } from "@react-md/material-icons";

const items = [
  "Item 1",
  null,
  0,
  1,
  "separator",
  { children: "Item 2" },
  { role: "separator", inset: true },
  { rightIcon: <HomeSVGIcon />, children: "Home" },
];

const SimpleExamples: FunctionComponent = () => {
  return (
    <Container>
      <DropdownMenu
        id="dropdown-menu-1"
        menuLabelledby="dropdown-menu-1"
        items={items}
      >
        Options...
      </DropdownMenu>
      <DropdownMenu
        id="dropdown-menu-2"
        menuLabelledby="dropdown-menu-2"
        items={items}
        buttonType="icon"
        aria-label="Options..."
      >
        <MoreVertSVGIcon />
      </DropdownMenu>
    </Container>
  );
};

export default SimpleExamples;
