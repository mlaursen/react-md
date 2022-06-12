import { Avatar } from "@react-md/avatar";
import { TextContainer } from "@react-md/core";
import type { ReactElement } from "react";
import { FavoriteSVGIcon } from "src/components/FavoriteSVGIcon";

export default function AvatarPage(): ReactElement {
  return (
    <TextContainer>
      <Avatar src="https://picsum.photos/40/40?image=153" />
      <Avatar src="https://picsum.photos/40/40?image=103" color="blue" />
      <Avatar>A</Avatar>
      <Avatar color="orange">PL</Avatar>
      <Avatar color="teal">
        <FavoriteSVGIcon />
      </Avatar>
    </TextContainer>
  );
}
