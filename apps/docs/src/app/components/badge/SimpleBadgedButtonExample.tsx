import { Badge, Button, SrOnly } from "@react-md/core";
import NotificationsOutlinedIcon from "@react-md/material-icons/NotificationsOutlinedIcon";
import { type ReactElement } from "react";

export default function SimpleBadgedButtonExample(): ReactElement {
  return (
    <Button buttonType="icon">
      <Badge>3</Badge>
      <NotificationsOutlinedIcon />
      <SrOnly>Notifications</SrOnly>
    </Button>
  );
}
