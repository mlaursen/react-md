/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { FC } from "react";
import { cnb } from "cnbuilder";
import { Avatar, AvatarProps } from "@react-md/avatar";
import { FolderSVGIcon, InfoOutlineSVGIcon } from "@react-md/material-icons";
import { List, ListItem, ListSubheader } from "@react-md/list";
import { SVGIconProps } from "@react-md/icon";

import "./TwoLineExamples.scss";
import Container from "./Container";

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

const Folder: FC<AvatarProps> = props => (
  <Avatar {...props}>
    <FolderSVGIcon />
  </Avatar>
);

const InfoIcon: FC<SVGIconProps & { id: string; date: Date }> = ({
  id,
  className,
  // TODO: Remember why I added a date to these demos
  date: _date,
  ...props
}) => (
  <span
    id={`${id}-info`}
    tabIndex={0}
    className={cnb("two-line-list-example__icon", className)}
  >
    <InfoOutlineSVGIcon {...props} />
  </span>
);

const TwoLineExamples: FC = () => (
  <Container>
    <List className="two-line-list-example">
      <ListSubheader>Folders</ListSubheader>
      <ListItem
        id="two-line-item-0"
        secondaryText={formatShort(lastAccessedPhotos)}
        leftAvatar={<Folder color="blue" />}
        rightIcon={<InfoIcon id="two-line-item-0" date={lastAccessedPhotos} />}
        rightPosition="top"
      >
        Photos
      </ListItem>
      <ListItem
        id="two-line-item-1"
        secondaryText={formatShort(lastAccessedRecipes)}
        leftAvatar={<Folder color="green" />}
        rightIcon={<InfoIcon id="two-line-item-1" date={lastAccessedRecipes} />}
        rightPosition="top"
      >
        Recipes
      </ListItem>
      <ListItem
        id="two-line-item-2"
        secondaryText={formatShort(lastAccessedWork)}
        leftAvatar={<Folder color="red" />}
        rightIcon={<InfoIcon id="two-line-item-2" date={lastAccessedWork} />}
        rightPosition="top"
      >
        Work
      </ListItem>
    </List>
  </Container>
);

export default TwoLineExamples;
