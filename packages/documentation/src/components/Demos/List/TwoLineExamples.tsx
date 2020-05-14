/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { FC } from "react";
import cn from "classnames";
import { Avatar, AvatarProps } from "@react-md/avatar";
import { FolderSVGIcon, InfoOutlineSVGIcon } from "@react-md/material-icons";
import { List, ListItem, ListSubheader } from "@react-md/list";
import { SVGIconProps } from "@react-md/icon";
import { Tooltipped } from "@react-md/tooltip";

import Container from "./Container";
import styles from "./TwoLineExamples.module.scss";

const lastAccessedPhotos = new Date(2019, 0, 4);
const lastAccessedRecipes = new Date();
lastAccessedRecipes.setDate(lastAccessedRecipes.getDate() - 2);
const lastAccessedWork = new Date();

const formatShort = (d: Date): string =>
  d.toLocaleString(undefined, {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

const Folder: FC<AvatarProps> = (props) => (
  <Avatar {...props}>
    <FolderSVGIcon />
  </Avatar>
);

const InfoIcon: FC<SVGIconProps & { id: string; date: Date }> = ({
  id,
  className,
  date,
  ...props
}) => (
  <Tooltipped
    id={`${id}-info`}
    tooltip={date.toLocaleString()}
    defaultPosition="left"
  >
    <span tabIndex={0} className={cn(styles.icon, className)}>
      <InfoOutlineSVGIcon {...props} />
    </span>
  </Tooltipped>
);

const TwoLineExamples: FC = () => (
  <Container>
    <List>
      <ListSubheader>Folders</ListSubheader>
      <ListItem
        id="two-line-item-0"
        secondaryText={formatShort(lastAccessedPhotos)}
        leftAddon={<Folder color="blue" />}
        leftAddonType="avatar"
        rightAddon={<InfoIcon id="two-line-item-0" date={lastAccessedPhotos} />}
        rightAddonPosition="top"
      >
        Photos
      </ListItem>
      <ListItem
        id="two-line-item-1"
        secondaryText={formatShort(lastAccessedRecipes)}
        leftAddon={<Folder color="green" />}
        leftAddonType="avatar"
        rightAddon={
          <InfoIcon id="two-line-item-1" date={lastAccessedRecipes} />
        }
        rightAddonPosition="top"
      >
        Recipes
      </ListItem>
      <ListItem
        id="two-line-item-2"
        secondaryText={formatShort(lastAccessedWork)}
        leftAddon={<Folder color="red" />}
        leftAddonType="avatar"
        rightAddon={<InfoIcon id="two-line-item-2" date={lastAccessedWork} />}
        rightAddonPosition="top"
      >
        Work
      </ListItem>
    </List>
  </Container>
);

export default TwoLineExamples;
