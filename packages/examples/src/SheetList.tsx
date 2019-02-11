import React, { FunctionComponent, useRef, useEffect } from "react";
import { List, ListItem, SimpleListItem } from "@react-md/list";
import {
  CloseSVGIcon,
  ShareSVGIcon,
  LinkSVGIcon,
  EditSVGIcon,
  DeleteSVGIcon,
} from "@react-md/material-icons";
import { Divider } from "@react-md/divider";

const onClick = (event: React.MouseEvent<HTMLLIElement>) => {
  console.log(`Clicked: ${event.currentTarget.id}`);
};

const SheetList: FunctionComponent = () => {
  return (
    <List>
      <ListItem
        id="menu-item-1"
        role="menuitem"
        leftIcon={<ShareSVGIcon />}
        tabIndex={-1}
        onClick={onClick}
      >
        Share
      </ListItem>
      <ListItem
        id="menu-item-2"
        role="menuitem"
        leftIcon={<LinkSVGIcon />}
        tabIndex={-1}
        onClick={onClick}
      >
        Get Link
      </ListItem>
      <ListItem
        id="menu-item-3"
        role="menuitem"
        leftIcon={<EditSVGIcon />}
        tabIndex={-1}
        onClick={onClick}
      >
        Edit Name
      </ListItem>
      <ListItem
        id="menu-item-4"
        role="menuitem"
        leftIcon={<DeleteSVGIcon />}
        className="rmd-theme-error"
        tabIndex={-1}
        onClick={onClick}
      >
        Delete Collection
      </ListItem>
      <SimpleListItem role="none">
        <input
          id="menu-item-5"
          type="file"
          onChange={event => {
            console.log("event.target.value:", event.target.value);
            (event.currentTarget.parentElement as HTMLElement).click();
          }}
          onClick={event => {
            event.stopPropagation();
            // the focus event will work for closing menus if the user hits cancel
            // window.addEventListener("focus", e => {
            //   console.log("e:", e);
            // });
          }}
        />
      </SimpleListItem>
      <Divider />
      <ListItem
        id="menu-item-close"
        role="menuitem"
        leftIcon={<CloseSVGIcon />}
        tabIndex={-1}
        onClick={onClick}
      >
        Close
      </ListItem>
    </List>
  );
};

export default SheetList;
