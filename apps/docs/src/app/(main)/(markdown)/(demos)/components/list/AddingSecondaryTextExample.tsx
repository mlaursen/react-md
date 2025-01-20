import { List } from "@react-md/core/list/List";
import { ListItem } from "@react-md/core/list/ListItem";
import { type ReactElement } from "react";

import styles from "./AddingSecondaryTextExample.module.scss";

export default function AddingSecondaryTextExample(): ReactElement {
  return (
    <List className={styles.container}>
      <ListItem secondaryText={<span>Secondary content text</span>}>
        Main Content Text
      </ListItem>
      <ListItem
        primaryText="Main Content Text"
        secondaryText="Secondary content text"
      />
      <ListItem secondaryText="Phasellus accumsan auctor neque, eu dignissim ex.">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </ListItem>
    </List>
  );
}
