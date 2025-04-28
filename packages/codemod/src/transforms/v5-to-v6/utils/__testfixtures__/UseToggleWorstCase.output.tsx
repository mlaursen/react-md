import {
  EmailSVGIcon,
  KeyboardArrowDownSVGIcon,
  PhoneSVGIcon,
} from "@react-md/material-icons";
import type { ReactElement } from "react";
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
  MediaContainer,
  useToggle,
} from "react-md";

import Container from "./Container";

export default function ExpandableCards(): ReactElement {
  const {
    toggled: expanded,
    toggle: toggle
  } = useToggle(false);
  return (
    <Container centered>
      <Card>
        <MediaContainer fullWidth>
          <img src="https://picsum.photos/300/200?image=1011" alt="" />
        </MediaContainer>
        <CardHeader
          beforeChildren={
            <Avatar>
              <img src="https://picsum.photos/40?image=1011" alt="" />
            </Avatar>
          }
          afterChildren={
            <Button
              id="expand-card-button"
              onClick={toggle}
              buttonType="icon"
              aria-label="Expand"
              theme="clear"
            >
              <IconRotator rotated={expanded}>
                <KeyboardArrowDownSVGIcon />
              </IconRotator>
            </Button>
          }
        >
          <CardTitle>Elizabeth Park</CardTitle>
          <CardSubtitle>Work contact</CardSubtitle>
        </CardHeader>
        <Collapse collapsed={!expanded}>
          <List>
            <ListItem leftAddon={<PhoneSVGIcon />} secondaryText="Mobile">
              (000) 000-0000
            </ListItem>
            <ListItem leftAddon={<EmailSVGIcon />} secondaryText="Work">
              heyfromelizabeth@gmail.com
            </ListItem>
          </List>
        </Collapse>
      </Card>
    </Container>
  );
}
