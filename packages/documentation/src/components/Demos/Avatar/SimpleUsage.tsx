import { ReactElement } from "react";
import { Avatar } from "@react-md/avatar";
import { FontIcon } from "@react-md/icon";
import { NoteSVGIcon } from "@react-md/material-icons";

import Container from "./Container";

export default function SimpleUsage(): ReactElement {
  return (
    <Container>
      <Avatar src="https://picsum.photos/40/40?image=153" />
      <Avatar src="https://picsum.photos/40/40?image=103" color="blue" />
      <Avatar>A</Avatar>
      <Avatar color="orange">PL</Avatar>
      <Avatar color="red">
        <FontIcon>favorite</FontIcon>
      </Avatar>
      <Avatar color="teal">
        <NoteSVGIcon />
      </Avatar>
    </Container>
  );
}
