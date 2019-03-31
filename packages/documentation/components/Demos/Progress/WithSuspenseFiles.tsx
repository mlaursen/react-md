import React, { FunctionComponent } from "react";
import { List, ListItem, ListSubheader } from "@react-md/list";
import {
  FilterSVGIcon,
  InfoSVGIcon,
  SubjectSVGIcon,
  FolderSVGIcon,
} from "@react-md/material-icons";
import { Divider } from "@react-md/divider";
import { CrossFade } from "@react-md/transition";
import { bem } from "@react-md/theme";

const fade = bem("cross-fade");

const WithSuspenseFiles: FunctionComponent = () => {
  return (
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
};

export default WithSuspenseFiles;
