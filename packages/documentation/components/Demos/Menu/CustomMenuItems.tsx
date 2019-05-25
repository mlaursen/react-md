import React, { FC, useState, Fragment, useCallback } from "react";
import { MenuItem, MenuItemProps, DropdownMenu } from "@react-md/menu";
import { ShareSVGIcon, AddSVGIcon } from "@react-md/material-icons";
import { Text } from "@react-md/typography";

import Code from "components/Code/Code";

const Share: FC<MenuItemProps> = props => (
  <MenuItem {...props} leftIcon={<ShareSVGIcon />}>
    Share
  </MenuItem>
);

const New: FC<MenuItemProps> = props => (
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
    <Fragment>
      <Text type="headline-6">
        Custom <Code>MenuItem</Code>
      </Text>
      <Text>
        Last clicked valie: <Code>{value}</Code>
      </Text>
      <DropdownMenu
        id="custom-menu-items"
        menuLabelledby="custom-menu-items"
        items={[<Share onClick={onClick} />, <New onClick={onClick} />]}
      >
        Options
      </DropdownMenu>
    </Fragment>
  );
};

export default CustomMenuItems;
