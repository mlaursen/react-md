/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Box, TextContainer } from "@react-md/core";
import { Checkbox } from "@react-md/form";
import HomeIcon from "@react-md/material-icons/HomeIcon";
import InfoOutlineIcon from "@react-md/material-icons/InfoOutlineIcon";
import type { DropdownMenuProps } from "@react-md/menu";
import {
  DropdownMenu,
  MenuConfigurationProvider,
  MenuItem,
  MenuItemLink,
  MenuItemSeparator,
} from "@react-md/menu";
import type { ReactElement } from "react";
import { useState } from "react";
import { HoverableMenus } from "src/components/Menus/HoverableMenus";
import { InfiniteDropdownMenu } from "src/components/Menus/InfiniateDropdownMenu";

function SimpleExample(props: Partial<DropdownMenuProps>): ReactElement {
  const [visible, setVisible] = useState(false);
  return (
    <DropdownMenu
      id="example-id"
      buttonChildren="Options..."
      {...props}
      visible={visible}
      setVisible={setVisible}
    >
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem leftAddon={<HomeIcon />}>Item 3 </MenuItem>
      <MenuItem rightAddon={<InfoOutlineIcon />}>
        <span>Custom content</span>
      </MenuItem>
      <MenuItemSeparator />
      {/* You can provide a custom link component by using `component={Link}` */}
      <MenuItemLink href="#">Link 1</MenuItemLink>
      <MenuItemSeparator inset />
      <MenuItemLink href="#">Link 2</MenuItemLink>
    </DropdownMenu>
  );
}

function NestedDropdownMenus(): ReactElement {
  const [horizontal, setHorizontal] = useState(false);
  const [visible, setVisible] = useState(false);
  return (
    <MenuConfigurationProvider horizontal={horizontal}>
      <Box stacked>
        <Checkbox
          label="Horizontal"
          name="horizontal"
          checked={horizontal}
          onChange={(event) => setHorizontal(event.currentTarget.checked)}
        />
        <DropdownMenu
          buttonChildren="Dropdown"
          visible={visible}
          setVisible={setVisible}
        >
          <MenuItem>Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
          <InfiniteDropdownMenu depth={0} index={0} />
          <MenuItem>Item 4</MenuItem>
          <MenuItem>Item 5</MenuItem>
        </DropdownMenu>
      </Box>
    </MenuConfigurationProvider>
  );
}

export default function MenuPage(): ReactElement {
  return (
    <TextContainer>
      <HoverableMenus />
    </TextContainer>
  );
}
