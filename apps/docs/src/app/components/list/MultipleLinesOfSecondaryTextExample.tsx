import { List, ListItem } from "@react-md/core";
import { type ReactElement } from "react";
import styles from "./MultipleLinesOfSecondaryTextExample.module.scss";

export default function MultipleLinesOfSecondaryTextExample(): ReactElement {
  return (
    <List className={styles.container}>
      <ListItem
        secondaryText="I'll be in your neighborhood sometimes this week. Would you like to try brunch this weekend?"
        multiline
      >
        Brunch this weekend?
      </ListItem>
      <ListItem
        multiline
        secondaryText="Wish I could come, but I'm out of town this weekend"
      >
        Summer BBQ
      </ListItem>
    </List>
  );
}
