import { List } from "@react-md/core/list/List";
import { ListItem } from "@react-md/core/list/ListItem";
import StarIcon from "@react-md/material-icons/StarIcon";
import { type ReactElement } from "react";

export default function MediaAddonsExample(): ReactElement {
  return (
    <List>
      <ListItem
        leftAddon={<img src="https://i.pravatar.cc/56?img=1" alt="" />}
        leftAddonType="media"
      >
        Left Media
      </ListItem>
      <ListItem
        rightAddon={<img src="https://i.pravatar.cc/56?img=4" alt="" />}
        rightAddonType="media"
      >
        Right Media
      </ListItem>
      <ListItem
        leftAddon={<img src="https://i.pravatar.cc/56?img=8" alt="" />}
        leftAddonType="media"
        rightAddon={<StarIcon />}
        secondaryText="Scott Stirling. The Man. The Myth. The Legend."
        multiline
      >
        {"See your video? You're a legend!"}
      </ListItem>
    </List>
  );
}
