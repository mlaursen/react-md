import { Badge } from "@react-md/core/badge/Badge";
import { Button } from "@react-md/core/button/Button";
import { SrOnly } from "@react-md/core/typography/SrOnly";
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
