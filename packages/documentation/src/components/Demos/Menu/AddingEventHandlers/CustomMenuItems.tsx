import React, { FC, useCallback, useState } from "react";
import { AddSVGIcon, ShareSVGIcon } from "@react-md/material-icons";
import { DropdownMenu, MenuItem, MenuItemProps } from "@react-md/menu";
import { Text } from "@react-md/typography";

import Code from "components/Code/Code";

const Share: FC<MenuItemProps> = (props) => (
  <MenuItem {...props} leftIcon={<ShareSVGIcon />}>
    Share
  </MenuItem>
);

const New: FC<MenuItemProps> = (props) => (
  <MenuItem {...props} leftIcon={<AddSVGIcon />}>
    New
  </MenuItem>
);

const CustomMenuItems: FC = () => {
  const [value, setValue] = useState("None");
  const onClick = useCallback((event: React.MouseEvent<HTMLLIElement>) => {
    setValue(event.currentTarget.textContent || "");
  }, []);
  return (
    <>
      <Text type="headline-6">
        Custom <Code>MenuItem</Code>
      </Text>
      <Text>
        Last clicked value: <Code>{value}</Code>
      </Text>
      <DropdownMenu
        id="custom-menu-items"
        items={[<Share onClick={onClick} />, <New onClick={onClick} />]}
      >
        Options
      </DropdownMenu>
    </>
  );
};

export default CustomMenuItems;
