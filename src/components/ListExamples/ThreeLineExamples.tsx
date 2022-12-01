import { List, ListItem } from "@react-md/list";
import StarIcon from "@react-md/material-icons/StarIcon";
import type { ReactElement } from "react";

export function ThreeLineExamples(): ReactElement {
  return (
    <List style={{ width: "100%", maxWidth: "30rem" }}>
      <ListItem
        leftAddon={<img src="https://i.pravatar.cc/56?img=54" alt="" />}
        leftAddonType="media"
        rightAddon={<StarIcon />}
        rightAddonPosition="top"
        secondaryText="I'll be in your neighborhood sometimes this week. Would you like to try brunch this weekend?"
        threeLines
      >
        Brunch this weekend?
      </ListItem>
      <ListItem
        leftAddon={<img src="https://i.pravatar.cc/56?img=1" alt="" />}
        leftAddonType="media"
        rightAddon={<StarIcon />}
        rightAddonPosition="top"
        secondaryText="Wish I could come, but I'm out of town this weekend"
        threeLines
      >
        Summer BBQ
      </ListItem>
      <ListItem
        leftAddon={<img src="https://i.pravatar.cc/56?img=8" alt="" />}
        leftAddonType="media"
        rightAddon={<StarIcon />}
        rightAddonPosition="top"
        secondaryText="Scott Stirling. The Man. The Myth. The Legend."
        threeLines
      >
        {"See your video? You're a legend!"}
      </ListItem>
    </List>
  );
}
