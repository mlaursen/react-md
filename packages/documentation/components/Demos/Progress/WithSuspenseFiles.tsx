import React, { FunctionComponent } from "react";
import { Divider } from "@react-md/divider";
import { List, ListItem, ListSubheader } from "@react-md/list";
import {
  FilterSVGIcon,
  FolderSVGIcon,
  InfoSVGIcon,
  SubjectSVGIcon,
} from "@react-md/material-icons";
import { CrossFade } from "@react-md/transition";

const WithSuspenseFiles: FunctionComponent = () => (
  <CrossFade>
    <List>
      <ListItem
        leftIcon={<SubjectSVGIcon />}
        rightIcon={<InfoSVGIcon />}
        primaryText="Vacation itinerary"
        secondaryText="2 hours ago"
      />
      <ListItem
        leftIcon={<FolderSVGIcon />}
        rightIcon={<InfoSVGIcon />}
        primaryText="Recipes"
        secondaryText="Yesterday"
      />
      <ListItem
        leftIcon={<FilterSVGIcon />}
        rightIcon={<InfoSVGIcon />}
        primaryText="Seoul 2018"
        secondaryText="October 30, 2018"
      />
      <Divider inset />
      <ListSubheader inset>All files</ListSubheader>
      <ListItem
        leftIcon={<FolderSVGIcon />}
        rightIcon={<InfoSVGIcon />}
        primaryText="Baby shower"
        secondaryText="6 items"
      />
      <ListItem
        leftIcon={<SubjectSVGIcon />}
        rightIcon={<InfoSVGIcon />}
        primaryText="Draft - Resume 2018"
        secondaryText="May 8, 2018"
      />
    </List>
  </CrossFade>
);

export default WithSuspenseFiles;
