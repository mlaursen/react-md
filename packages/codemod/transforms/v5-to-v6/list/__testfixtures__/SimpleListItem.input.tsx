import type { ReactElement } from "react";
import cn from "classnames";
import { FavoriteSVGIcon, List, SimpleListItem } from "react-md";

import people from "./people";

import Container from "./Container";
import styles from "./NonInteractable.module.scss";

export default function Demo(): ReactElement {
  return (
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
      <List>
        <SimpleListItem
          primaryText={<span>Primary Text</span>}
          secondaryText={
            <span className={styles.secondary}>Secondary Text</span>
          }
          leftAddon={<FavoriteSVGIcon />}
          rightAddon={<img alt="" src="https://example.com/image.jpeg" />}
          rightAddonType="media"
        >
          Other children
        </SimpleListItem>
      </List>
    </Container>
  );
}
