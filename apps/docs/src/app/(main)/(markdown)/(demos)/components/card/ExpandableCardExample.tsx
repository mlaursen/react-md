import { Avatar } from "@react-md/core/avatar/Avatar";
import { Button } from "@react-md/core/button/Button";
import { Card } from "@react-md/core/card/Card";
import { CardHeader } from "@react-md/core/card/CardHeader";
import { CardSubtitle } from "@react-md/core/card/CardSubtitle";
import { CardTitle } from "@react-md/core/card/CardTitle";
import { IconRotator } from "@react-md/core/icon/IconRotator";
import { List } from "@react-md/core/list/List";
import { ListItem } from "@react-md/core/list/ListItem";
import { ResponsiveItem } from "@react-md/core/responsive-item/ResponsiveItem";
import { Collapse } from "@react-md/core/transition/Collapse";
import { useToggle } from "@react-md/core/useToggle";
import EmailIcon from "@react-md/material-icons/EmailIcon";
import KeyboardArrowDownIcon from "@react-md/material-icons/KeyboardArrowDownIcon";
import PhoneIcon from "@react-md/material-icons/PhoneIcon";
import { type ReactElement } from "react";

import styles from "./ExpandableCardExample.module.scss";

export default function ExpandableCardExample(): ReactElement {
  const { toggled, toggle } = useToggle();

  return (
    <Card fullWidth className={styles.card}>
      <ResponsiveItem fullWidth>
        <img src="https://picsum.photos/300/200?image=1011" alt="" />
      </ResponsiveItem>
      <CardHeader
        beforeAddon={<Avatar src="https://picsum.photos/40?image=1011" />}
        afterAddon={
          <Button
            onClick={toggle}
            buttonType="icon"
            aria-label="Expand"
            theme="clear"
          >
            <IconRotator rotated={toggled}>
              <KeyboardArrowDownIcon />
            </IconRotator>
          </Button>
        }
      >
        <CardTitle>Elizabeth Park</CardTitle>
        <CardSubtitle>Work contact</CardSubtitle>
      </CardHeader>
      <Collapse collapsed={!toggled}>
        <List>
          <ListItem leftAddon={<PhoneIcon />} secondaryText="Mobile">
            (000) 000-0000
          </ListItem>
          <ListItem leftAddon={<EmailIcon />} secondaryText="Work">
            heyfromelizabeth@gmail.com
          </ListItem>
        </List>
      </Collapse>
    </Card>
  );
}
