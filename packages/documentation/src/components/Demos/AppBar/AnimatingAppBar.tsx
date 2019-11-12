import React, { FC, useRef, useState } from "react";
import { AppBar, AppBarAction, AppBarNav } from "@react-md/app-bar";
import { Avatar } from "@react-md/avatar";
import avatarVariables from "@react-md/avatar/dist/scssVariables";
import { List, ListItem } from "@react-md/list";
import { MenuSVGIcon, MoreVertSVGIcon } from "@react-md/material-icons";
import { UpdateVariables, useScrollListener } from "@react-md/utils";

import people from "constants/people";
import AppBarTitle from "components/AppBarTitle";

import "./AnimatingAppBar.scss";

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

  const ref = useRef<HTMLDivElement | null>(null);
  useScrollListener({
    element: ref.current,
    onScroll: () => {
      if (!ref.current) {
        return;
      }

      const { scrollTop } = ref.current;
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

  return (
    <UpdateVariables variables={[{ name: "offset", value: height }]}>
      {({ style }) => (
        <div style={style} className="animating-app-bar">
          <AppBar
            id="animating-app-bar"
            className="animating-app-bar__bar"
            fixed
            theme="clear"
          >
            <AppBarNav id="animating-app-bar-nav" aria-label="Navigation">
              <MenuSVGIcon />
            </AppBarNav>
            <AppBarTitle className="animating-app-bar__title">
              Animating App Bar
            </AppBarTitle>
            <AppBarAction
              id="animating-app-bar-kebab"
              aria-label="Actions"
              first
            >
              <MoreVertSVGIcon />
            </AppBarAction>
          </AppBar>
          <div className="animating-app-bar__content" ref={ref}>
            <List>
              {transformedPeople.map(({ id, name, avatar, color }, i) => (
                <ListItem
                  id={`person-${i}`}
                  key={id}
                  leftAvatar={<Avatar color={color}>{avatar}</Avatar>}
                >
                  {name}
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      )}
    </UpdateVariables>
  );
};

export default AnimatingAppBar;
