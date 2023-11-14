import { Divider, List, ListItem } from "@react-md/core";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { type ReactElement } from "react";
import styles from "./InsetDivider.module.scss";

export default function InsetDivider(): ReactElement {
  return (
    <List className={styles.list}>
      <ListItem leftAddon={<FavoriteIcon />}>Item 1</ListItem>
      <Divider />
      <ListItem leftAddon={<FavoriteIcon />}>Item 2</ListItem>
      <ListItem leftAddon={<FavoriteIcon />}>Item 3</ListItem>
      <Divider inset />
      <ListItem leftAddon={<FavoriteIcon />}>Item 4</ListItem>
      <ListItem leftAddon={<FavoriteIcon />}>Item 5</ListItem>
      <ListItem leftAddon={<FavoriteIcon />}>Item 6</ListItem>
    </List>
  );
}
