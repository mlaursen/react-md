import { AppBar, AppBarTitle } from "@react-md/app-bar";
import { Button } from "@react-md/button";
import { DialogFooter } from "@react-md/dialog";
import { Divider } from "@react-md/divider";
import CloseIcon from "@react-md/material-icons/CloseIcon";
import {
  DropdownMenu,
  MenuConfigurationProvider,
  MenuItem,
  useMenuVisibility,
} from "@react-md/menu";
import type { ReactElement } from "react";

function Header(): ReactElement {
  const { setVisible } = useMenuVisibility();
  return (
    <AppBar theme="clear">
      <AppBarTitle>Custom</AppBarTitle>
      <Button onClick={() => setVisible(false)} buttonType="icon">
        <CloseIcon />
      </Button>
    </AppBar>
  );
}

function Footer(): ReactElement {
  const { setVisible } = useMenuVisibility();
  return (
    <>
      <Divider />
      <DialogFooter>
        <Button onClick={() => setVisible(false)}>Cancel</Button>
      </DialogFooter>
    </>
  );
}

export function MobileActionSheetExample(): ReactElement {
  const renderAsSheet = true;
  return (
    <>
      <MenuConfigurationProvider
        sheetHeader={<Header />}
        sheetFooter={<Footer />}
        renderAsSheet={renderAsSheet}
        // These can be configured as well. Showing the defaults for now
        // sheetPosition="below"
        // sheetVerticalSize="touch"
      >
        <DropdownMenu
          buttonChildren="Dropdown"
          // sheetStyle={{ margin: "0 2rem" }}
          // sheetClassName="my-custom-class-name"
        >
          <MenuItem disabled>Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
          <DropdownMenu buttonChildren="Child Dropdown">
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
            <MenuItem>Item 3</MenuItem>
            <MenuItem>Item 4</MenuItem>
            <MenuItem>Item 5</MenuItem>
          </DropdownMenu>
          <MenuItem>Item 3</MenuItem>
          <MenuItem>Item 4</MenuItem>
          <MenuItem>Item 5</MenuItem>
        </DropdownMenu>
      </MenuConfigurationProvider>
    </>
  );
}
