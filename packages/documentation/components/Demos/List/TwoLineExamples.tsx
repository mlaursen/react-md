import React, { FunctionComponent } from "react";
import cn from "classnames";
import { Avatar, AvatarProps } from "@react-md/avatar";
import { FolderSVGIcon, InfoOutlineSVGIcon } from "@react-md/material-icons";
import { List, ListItem, ListSubheader } from "@react-md/list";
import { SVGIconProps } from "@react-md/icon";
import { Tooltipped } from "@react-md/tooltip";

import people from "constants/people";

import "./two-line-examples.scss";

const Folder: FunctionComponent<AvatarProps> = props => (
  <Avatar {...props}>
    <FolderSVGIcon />
  </Avatar>
);

const lastAccessedPhotos = new Date(2019, 0, 4);
const lastAccessedRecipes = new Date();
lastAccessedRecipes.setDate(lastAccessedRecipes.getDate() - 2);
const lastAccessedWork = new Date();

const format = (d: Date, options: Intl.DateTimeFormatOptions) =>
  d.toLocaleString(undefined, options);
const itemOptions: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "2-digit",
  year: "numeric",
};
const tooltipOptions: Intl.DateTimeFormatOptions = {
  month: "long",
  weekday: "short",
  day: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

const InfoIcon: FunctionComponent<
  SVGIconProps & { id: string; date: Date }
> = ({ id, className, date, ...props }) => (
  <Tooltipped
    id={`${id}-info`}
    tooltip={`Last Accessed: ${format(date, tooltipOptions)}`}
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
  <List className="two-line-list-example">
    <ListSubheader>Folders</ListSubheader>
    <ListItem
      id="two-line-item-0"
      secondaryText={format(lastAccessedPhotos, itemOptions)}
      leftAvatar={<Folder color="blue" />}
      rightIcon={<InfoIcon id="two-line-item-0" date={lastAccessedPhotos} />}
    >
      Photos
    </ListItem>
    <ListItem
      id="two-line-item-1"
      secondaryText={format(lastAccessedRecipes, itemOptions)}
      leftAvatar={<Folder color="green" />}
      rightIcon={<InfoIcon id="two-line-item-1" date={lastAccessedRecipes} />}
    >
      Recipes
    </ListItem>
    <ListItem
      id="two-line-item-2"
      secondaryText={format(lastAccessedWork, itemOptions)}
      leftAvatar={<Folder color="red" />}
      rightIcon={<InfoIcon id="two-line-item-2" date={lastAccessedWork} />}
    >
      Work
    </ListItem>
  </List>
);

export default TwoLineExamples;
