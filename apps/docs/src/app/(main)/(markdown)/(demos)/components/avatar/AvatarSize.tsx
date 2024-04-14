import { Avatar } from "@react-md/core/avatar/Avatar";
import { type ReactElement } from "react";

export default function AvatarSize(): ReactElement {
  return (
    <>
      <Avatar src="https://i.pravatar.cc/24?img=25" size="icon" />
      <Avatar src="https://i.pravatar.cc/48?img=24" size="avatar" />
    </>
  );
}
