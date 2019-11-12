/* eslint-disable react/no-array-index-key */
import React, { FC } from "react";
import { List, ListItem } from "@react-md/list";
import { StarSVGIcon } from "@react-md/material-icons";

import Container from "./Container";

const inbox = [
  {
    from: "Ali Connors",
    subject: "Bunch this weekend?",
    message:
      "I'll be in your neighborhood sometime this week. Would you like to try brunch this weekend?",
  },
  {
    from: "Ali Connors",
    subject: "Summer BBQ",
    message: "Wish I could come, but I'm out of town this weekend.",
  },
  {
    from: "Scott Stirling",
    subject: "See your video? You're a legend!",
    message:
      "I still can't believe it happened... I'm not sure if my face will ever recover.",
  },
];

const ThreeLineExamples: FC = () => (
  <Container>
    <List>
      {inbox.map(({ subject, message }, i) => (
        <ListItem
          id={`three-line-item-${i}`}
          key={i}
          leftMedia={
            <img src={`https://picsum.photos/40?image=100${i}`} alt="" />
          }
          rightIcon={<StarSVGIcon />}
          rightPosition="top"
          secondaryText={message}
          threeLines
        >
          {subject}
        </ListItem>
      ))}
    </List>
  </Container>
);

export default ThreeLineExamples;
