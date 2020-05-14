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
import styles from "./RowWithMenu.module.scss";

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
        className={styles.row}
      >
        <TableCell>{name}</TableCell>
        <TableCell>{owner}</TableCell>
        <TableCell>{lastModified}</TableCell>
        <TableCell hAlign="right">{size || "-"}</TableCell>
      </TableRow>
      <Menu aria-label={`${name} Options`} controlId={id} portal {...menuProps}>
        <List>
          <MenuItem leftAddon={<ShareSVGIcon />}>Share</MenuItem>
          <MenuItem leftAddon={<LinkSVGIcon />}>Get shareable link</MenuItem>
          <MenuItem leftAddon={<StarSVGIcon />}>Add to Starred</MenuItem>
          <MenuItem leftAddon={<EditSVGIcon />}>Rename</MenuItem>
          <Divider />
          <MenuItem leftAddon={<InfoSVGIcon />}>View Details</MenuItem>
          <MenuItem leftAddon={<FileDownloadSVGIcon />}>Download</MenuItem>
          <Divider />
          <MenuItem leftAddon={<DeleteSVGIcon />}>Remove</MenuItem>
        </List>
      </Menu>
    </>
  );
};

export default RowWithMenu;
