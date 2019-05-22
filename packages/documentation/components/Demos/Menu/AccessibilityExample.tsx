import React, { FunctionComponent } from "react";
import { DropdownMenu } from "@react-md/menu";
import Container from "./Container";

const AccessibilityExample: FunctionComponent = () => (
  <Container>
    <DropdownMenu
      id="accessibility-menu-1"
      menuLabelledby="accessibility-menu-1"
      items={["Share", "Open", "Rename", "Make a copy", "Move To"]}
    >
      Options...
    </DropdownMenu>
  </Container>
);

export default AccessibilityExample;
