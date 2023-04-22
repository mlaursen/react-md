import { Avatar, box, TextContainer } from "@react-md/core";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import type { ReactElement } from "react";

export default function AvatarPage(): ReactElement {
  return (
    <TextContainer className={box()}>
      <Avatar src="https://i.pravatar.cc/40?img=24" />
      <Avatar src="https://i.pravatar.cc/40?img=24" color="blue" />
      <Avatar>A</Avatar>
      <Avatar color="orange">PL</Avatar>
      <Avatar color="teal">
        <FavoriteIcon />
      </Avatar>
    </TextContainer>
  );
}
