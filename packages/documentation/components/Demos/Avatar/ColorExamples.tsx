import React, { FC, Fragment } from "react";
import { Avatar } from "@react-md/avatar";
import scssVariables from "@react-md/avatar/dist/scssVariables";
import { List, ListItem } from "@react-md/list";

import people from "constants/people";

import Container from "./Container";
import "./color-examples.scss";

const COLORS = Object.keys(scssVariables["rmd-avatar-colors"]);
const transformedPeople = people.map((name, i) => ({
  id: name.toLowerCase().replace(/ /g, "-"),
  name,
  avatar: name.substring(0, 1),
  color: COLORS[i % COLORS.length],
}));

const ColorExamples: FC = () => (
  <Fragment>
    <Container>
      {COLORS.map(color => (
        <Avatar color={color} key={color}>
          {color.substring(0, 1).toUpperCase()}
        </Avatar>
      ))}
    </Container>
    <List className="avatar-color-list">
      {transformedPeople.map(({ id, name, avatar, color }, i) => (
        <ListItem
          id={`person-${i}`}
          key={id}
          leftAvatar={<Avatar color={color}>{avatar}</Avatar>}
        >
          {name}
        </ListItem>
      ))}
    </List>
  </Fragment>
);

export default ColorExamples;
