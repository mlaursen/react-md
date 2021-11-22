// keys aren't required for the dropdown menu items
/* eslint-disable react/jsx-key */
import { ReactElement, useCallback, useState } from "react";
import { AddSVGIcon, ShareSVGIcon } from "@react-md/material-icons";
import { DropdownMenu, MenuItem, MenuItemProps } from "@react-md/menu";
import { Text } from "@react-md/typography";

import Code from "components/Code";

function Share(props: MenuItemProps): ReactElement {
  return (
    <MenuItem {...props} leftAddon={<ShareSVGIcon />}>
      Share
    </MenuItem>
  );
}

function New(props: MenuItemProps): ReactElement {
  return (
    <MenuItem {...props} leftAddon={<AddSVGIcon />}>
      New
    </MenuItem>
  );
}

export default function CustomMenuItems(): ReactElement {
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
}
