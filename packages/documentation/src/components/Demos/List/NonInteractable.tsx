import React, { FC } from "react";
import cn from "classnames";
import { List, SimpleListItem } from "@react-md/list";

import people from "constants/people";

import Container from "./Container";
import styles from "./NonInteractable.module.scss";

const NonInteractable: FC = () => (
  <Container>
    <List>
      {people.slice(0, 10).map((name) => (
        <SimpleListItem
          key={name}
          className={cn(styles.item, styles.dotted, styles.margin)}
        >
          {name}
        </SimpleListItem>
      ))}
    </List>
    <List className={styles.ordered}>
      {people.slice(11, 20).map((name) => (
        <SimpleListItem key={name} className={cn(styles.item, styles.margin)}>
          {name}
        </SimpleListItem>
      ))}
    </List>
  </Container>
);

export default NonInteractable;
