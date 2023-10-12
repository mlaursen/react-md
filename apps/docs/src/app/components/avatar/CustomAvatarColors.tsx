import { Avatar, black, orange100, red500 } from "@react-md/core";
import { type ReactElement } from "react";

export default function CustomAvatarColors(): ReactElement {
  return (
    <>
      <Avatar
        style={{
          "--rmd-avatar-color": red500,
          "--rmd-avatar-background-color": black,
        }}
      >
        C
      </Avatar>
      <Avatar
        style={{
          color: black,
          backgroundColor: orange100,
        }}
      >
        C
      </Avatar>
    </>
  );
}
