import { List } from "@react-md/core/list/List";
import { ListItem } from "@react-md/core/list/ListItem";
import { type ReactElement } from "react";

export default function LargeMediaAddonsExample(): ReactElement {
  return (
    <List>
      <ListItem
        leftAddon={<img src="https://picsum.photos/100/56?image=800" alt="" />}
        leftAddonType="large-media"
      >
        Left Large Media
      </ListItem>
      <ListItem
        leftAddon={<img src="https://picsum.photos/100/56?image=803" alt="" />}
        leftAddonType="large-media"
        secondaryText="With secondary text"
      >
        Left Large Media
      </ListItem>
      <ListItem
        rightAddon={<img src="https://picsum.photos/100/56?image=700" alt="" />}
        rightAddonType="large-media"
      >
        Right Large Media
      </ListItem>
      <ListItem
        rightAddon={<img src="https://picsum.photos/100/56?image=738" alt="" />}
        rightAddonType="large-media"
        secondaryText="With secondary text"
      >
        Right Large Media
      </ListItem>
    </List>
  );
}
