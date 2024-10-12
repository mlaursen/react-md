import { AppBar } from "@react-md/core/app-bar/AppBar";
import { AppBarTitle } from "@react-md/core/app-bar/AppBarTitle";
import { Button } from "@react-md/core/button/Button";
import { DialogFooter } from "@react-md/core/dialog/DialogFooter";
import { Divider } from "@react-md/core/divider/Divider";
import { DropdownMenu } from "@react-md/core/menu/DropdownMenu";
import { MenuConfigurationProvider } from "@react-md/core/menu/MenuConfigurationProvider";
import { MenuItem } from "@react-md/core/menu/MenuItem";
import { useMenuVisibility } from "@react-md/core/menu/MenuVisibilityProvider";
import CloseIcon from "@react-md/material-icons/CloseIcon";
import { type ReactElement } from "react";

export default function SheetOptionsExample(): ReactElement {
  const renderAsSheet = true;

  return (
    <>
      <MenuConfigurationProvider
        sheetHeader={<Header />}
        sheetFooter={<Footer />}
        renderAsSheet={renderAsSheet}
        // these are the defaults
        sheetPosition="bottom"
        sheetVerticalSize="touch"
      >
        <DropdownMenu
          buttonChildren="Dropdown"
          // additional styles can be passed to the sheet from the DropdownMenu
          // sheetStyle={{ margin: "0 2rem" }}
          // sheetClassName="my-custom-class-name"
          //
          // any other props available on the Sheet component
          // sheetProps={{
          //   horizontalSize: "touch"
          // }}
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

function Header(): ReactElement {
  const { setVisible } = useMenuVisibility();
  return (
    <AppBar theme="clear">
      <AppBarTitle>Custom</AppBarTitle>
      <Button
        onClick={() => {
          setVisible(false);
        }}
        buttonType="icon"
      >
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
        <Button
          onClick={() => {
            setVisible(false);
          }}
        >
          Cancel
        </Button>
      </DialogFooter>
    </>
  );
}
