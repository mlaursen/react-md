import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CardSubtitle,
  CardTitle,
  Collapse,
  IconRotator,
  List,
  ListItem,
  ResponsiveItemContainer,
  useToggle,
} from "@react-md/core";
import EmailIcon from "@react-md/material-icons/EmailIcon";
import KeyboardArrowDownIcon from "@react-md/material-icons/KeyboardArrowDownIcon";
import PhoneIcon from "@react-md/material-icons/PhoneIcon";
import { type ReactElement } from "react";
import styles from "./ExpandableCardExample.module.scss";

export default function ExpandableCardExample(): ReactElement {
  const { toggled, toggle } = useToggle();

  return (
    <Card fullWidth className={styles.card}>
      <ResponsiveItemContainer fullWidth>
        <img src="https://picsum.photos/300/200?image=1011" alt="" />
      </ResponsiveItemContainer>
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
