import { Avatar } from "@react-md/core";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { type ReactElement } from "react";

export default function SimpleAvatar(): ReactElement {
  return (
    <>
      <Avatar src="https://i.pravatar.cc/48?img=38" />
      <Avatar>
        <FavoriteIcon />
      </Avatar>
      <Avatar>A</Avatar>
      <Avatar>PL</Avatar>
    </>
  );
}
