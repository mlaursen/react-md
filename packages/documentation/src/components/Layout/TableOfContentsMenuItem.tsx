import React, { FC } from "react";
import { MenuItem } from "@react-md/menu";
import { ViewHeadlineSVGIcon } from "@react-md/material-icons";
import {
  useTOCActions,
  useTOCVisibility,
} from "components/TableOfContents/VisibilityContext";

const TableOfContentsMenuItem: FC = () => {
  const { show } = useTOCActions();
  const { rendered } = useTOCVisibility();
  if (!rendered) {
    return null;
  }

  return (
    <MenuItem
      id="table-of-contents"
      leftAddon={<ViewHeadlineSVGIcon />}
      onClick={show}
      secondaryText={<i>Current page only</i>}
    >
      Table of contents
    </MenuItem>
  );
};

export default TableOfContentsMenuItem;
