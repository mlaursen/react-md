import { Avatar, Box, red900 } from "@react-md/core";
import { type ReactElement } from "react";

export default function AvatarBorders(): ReactElement {
  return (
    <Box style={{ "--rmd-avatar-border-color": "currentcolor" }}>
      <Avatar src="https://i.pravatar.cc/48?img=44" color="orange" />
      <Avatar color="blue">H</Avatar>
      <Avatar color="deep-orange">D</Avatar>
      <Avatar color="purple">A</Avatar>
      <Avatar theme="error" style={{ "--rmd-avatar-border-color": red900 }}>
        A
      </Avatar>
    </Box>
  );
}
