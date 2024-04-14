import { Avatar } from "@react-md/core/avatar/Avatar";
import { type ReactElement } from "react";

export default function AvatarThemeColors(): ReactElement {
  return (
    <>
      <Avatar theme="primary">P</Avatar>
      <Avatar theme="secondary">S</Avatar>
      <Avatar theme="warning">W</Avatar>
      <Avatar theme="success">S</Avatar>
      <Avatar theme="error">E</Avatar>
    </>
  );
}
