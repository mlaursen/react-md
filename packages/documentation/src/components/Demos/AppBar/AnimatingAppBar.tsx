import React, { FC, useState } from "react";
import { AppBar, AppBarAction, AppBarNav } from "@react-md/app-bar";
import { Avatar } from "@react-md/avatar";
import avatarVariables from "@react-md/avatar/dist/scssVariables";
import { List, ListItem } from "@react-md/list";
import { MenuSVGIcon, MoreVertSVGIcon } from "@react-md/material-icons";
import { useScrollListener } from "@react-md/utils";

import people from "constants/people";
import AppBarTitle from "components/AppBarTitle";

import styles from "./AnimatingAppBar.module.scss";

type CSSProperties = React.CSSProperties & {
  "--offset": string;
};

const COLORS = Object.keys(avatarVariables["rmd-avatar-colors"]);

const transformedPeople = people.map((name, i) => ({
  id: name.toLowerCase().replace(/ /g, "-"),
  name,
  avatar: name.substring(0, 1),
  color: COLORS[i % COLORS.length],
}));

const HEIGHT = 96;

// this is used along with the current `scrollTop` value to make
// the animation happen a bit slower. The number has no real significance
// and just looked "decent"
const SCROLL_MULTIPLIER = 0.314;

const AnimatingAppBar: FC = () => {
  const [height, setHeight] = useState(`${HEIGHT}px`);

  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  useScrollListener({
    element: ref,
    onScroll: () => {
      if (!ref) {
        return;
      }

      const { scrollTop } = ref;
      const remaining = Math.min(
        Math.max(HEIGHT - scrollTop * SCROLL_MULTIPLIER, 0),
        HEIGHT
      );
      const nextHeight = `${remaining}px`;
      if (height !== nextHeight) {
        setHeight(nextHeight);
      }
    },
  });

  const style: CSSProperties = {
    "--offset": height,
  };

  return (
    <div style={style} className={styles.container}>
      <AppBar
        id="animating-app-bar"
        className={styles.header}
        fixed
        theme="clear"
      >
        <AppBarNav id="animating-app-bar-nav" aria-label="Navigation">
          <MenuSVGIcon />
        </AppBarNav>
        <AppBarTitle className={styles.title}>Animating App Bar</AppBarTitle>
        <AppBarAction id="animating-app-bar-kebab" aria-label="Actions" first>
          <MoreVertSVGIcon />
        </AppBarAction>
      </AppBar>
      <div className={styles.content} ref={setRef}>
        <List>
          {transformedPeople.map(({ id, name, avatar, color }, i) => (
            <ListItem
              id={`person-${i}`}
              key={id}
              leftAddon={<Avatar color={color}>{avatar}</Avatar>}
              leftAddonType="avatar"
            >
              {name}
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default AnimatingAppBar;
