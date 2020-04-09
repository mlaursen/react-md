import React, { FC } from "react";
import { Collapse } from "@react-md/transition";
import { Card, CardHeader, CardTitle, CardSubtitle } from "@react-md/card";
import { Avatar } from "@react-md/avatar";
import { useToggle } from "@react-md/utils";
import { Button } from "@react-md/button";
import { IconRotator } from "@react-md/icon";
import {
  PhoneSVGIcon,
  EmailSVGIcon,
  KeyboardArrowDownSVGIcon,
} from "@react-md/material-icons";
import { List, ListItem } from "@react-md/list";
import { MediaContainer } from "@react-md/media";

import Container from "./Container";

const ExpandableCards: FC = () => {
  const [expanded, , , toggle] = useToggle(false);
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
            <ListItem leftIcon={<PhoneSVGIcon />} secondaryText="Mobile">
              (000) 000-0000
            </ListItem>
            <ListItem leftIcon={<EmailSVGIcon />} secondaryText="Work">
              heyfromelizabeth@gmail.com
            </ListItem>
          </List>
        </Collapse>
      </Card>
    </Container>
  );
};

export default ExpandableCards;
