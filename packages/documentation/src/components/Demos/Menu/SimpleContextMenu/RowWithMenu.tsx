import React, { ReactElement } from "react";
import { Divider } from "@react-md/divider";
import { List } from "@react-md/list";
import {
  DeleteSVGIcon,
  EditSVGIcon,
  FileDownloadSVGIcon,
  InfoSVGIcon,
  LinkSVGIcon,
  ShareSVGIcon,
  StarSVGIcon,
} from "@react-md/material-icons";
import { Menu, MenuItem, useContextMenu } from "@react-md/menu";
import { TableCell, TableRow } from "@react-md/table";

import { DriveContentItem } from "./data";

interface Props extends Omit<DriveContentItem, "id"> {
  size?: number;
  index: number;
}

const RowWithMenu = ({
  name,
  owner,
  lastModified,
  size,
  index,
}: Props): ReactElement | null => {
  const id = `content-row-${index + 1}`;
  const [menuProps, onContextMenu] = useContextMenu();
  const { visible } = menuProps;

  return (
    <>
      <TableRow
        id={id}
        tabIndex={0}
        onContextMenu={onContextMenu}
        selected={visible}
        className="simple-context-menu__row"
      >
        <TableCell>{name}</TableCell>
        <TableCell>{owner}</TableCell>
        <TableCell>{lastModified}</TableCell>
        <TableCell hAlign="right">{size || "-"}</TableCell>
      </TableRow>
      <Menu aria-label={`${name} Options`} controlId={id} portal {...menuProps}>
        <List>
          <MenuItem leftIcon={<ShareSVGIcon />}>Share</MenuItem>
          <MenuItem leftIcon={<LinkSVGIcon />}>Get shareable link</MenuItem>
          <MenuItem leftIcon={<StarSVGIcon />}>Add to Starred</MenuItem>
          <MenuItem leftIcon={<EditSVGIcon />}>Rename</MenuItem>
          <Divider />
          <MenuItem leftIcon={<InfoSVGIcon />}>View Details</MenuItem>
          <MenuItem leftIcon={<FileDownloadSVGIcon />}>Download</MenuItem>
          <Divider />
          <MenuItem leftIcon={<DeleteSVGIcon />}>Remove</MenuItem>
        </List>
      </Menu>
    </>
  );
};

export default RowWithMenu;
