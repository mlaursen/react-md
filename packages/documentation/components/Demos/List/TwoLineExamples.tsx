import React, { FunctionComponent } from "react";
import cn from "classnames";
import { Avatar, AvatarProps } from "@react-md/avatar";
import { FolderSVGIcon, InfoOutlineSVGIcon } from "@react-md/material-icons";
import { List, ListItem, ListSubheader } from "@react-md/list";
import { SVGIconProps } from "@react-md/icon";
import { Tooltipped } from "@react-md/tooltip";

import "./two-line-examples.scss";
import Container from "./Container";

const lastAccessedPhotos = new Date(2019, 0, 4);
const lastAccessedRecipes = new Date();
lastAccessedRecipes.setDate(lastAccessedRecipes.getDate() - 2);
const lastAccessedWork = new Date();

const formatShort = (d: Date) =>
  d.toLocaleString(undefined, {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
const formatLong = (d: Date) =>
  d.toLocaleString(undefined, {
    month: "long",
    weekday: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const Folder: FunctionComponent<AvatarProps> = props => (
  <Avatar {...props}>
    <FolderSVGIcon />
  </Avatar>
);

const InfoIcon: FunctionComponent<
  SVGIconProps & { id: string; date: Date }
> = ({ id, className, date, ...props }) => (
  <Tooltipped
    id={`${id}-info`}
    tooltip={`Last Accessed: ${formatLong(date)}`}
    portal
    lineWrap
    className="two-line-list-example__tooltip"
  >
    {({ tooltip, containerProps }) => (
      <span
        {...containerProps}
        tabIndex={0}
        className={cn("two-line-list-example__icon", className)}
      >
        <InfoOutlineSVGIcon {...props} />
        {tooltip}
      </span>
    )}
  </Tooltipped>
);

const TwoLineExamples: FunctionComponent = () => (
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
