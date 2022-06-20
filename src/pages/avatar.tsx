import { Avatar } from "@react-md/avatar";
import { box, TextContainer } from "@react-md/core";
import { FavoriteIcon } from "@react-md/material-icons/filled/action/FavoriteIcon";
import type { ReactElement } from "react";

export default function AvatarPage(): ReactElement {
  return (
    <TextContainer className={box()}>
      <Avatar src="https://picsum.photos/40/40?image=153" />
      <Avatar src="https://picsum.photos/40/40?image=103" color="blue" />
      <Avatar>A</Avatar>
      <Avatar color="orange">PL</Avatar>
      <Avatar color="teal">
        <FavoriteIcon />
      </Avatar>
    </TextContainer>
  );
}
