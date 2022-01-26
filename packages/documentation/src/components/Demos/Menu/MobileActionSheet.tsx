import type { ReactElement } from "react";
import { AppBar, AppBarAction, AppBarTitle } from "@react-md/app-bar";
import { Button } from "@react-md/button";
import { DialogFooter } from "@react-md/dialog";
import { Divider } from "@react-md/divider";
import { Select, useSelectState } from "@react-md/form";
import { CloseSVGIcon } from "@react-md/material-icons";
import {
  DropdownMenu,
  MenuConfigurationProvider,
  MenuItem,
  RenderMenuAsSheet,
  useMenuVisibility,
} from "@react-md/menu";

function Header(): ReactElement {
  const { setVisible } = useMenuVisibility();
  return (
    <AppBar theme="clear">
      <AppBarTitle>Custom</AppBarTitle>
      <AppBarAction first last onClick={() => setVisible(false)}>
        <CloseSVGIcon />
      </AppBarAction>
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

const choices = ["phone", "true", "false"] as const;
type Choices = typeof choices[number];

export default function MobileActionSheet(): ReactElement {
  const [choice, handleChoiceChange] = useSelectState<Choices>("phone");
  let renderAsSheet: RenderMenuAsSheet;
  if (choice === "phone") {
    renderAsSheet = choice;
  } else {
    renderAsSheet = choice === "true";
  }

  return (
    <>
      <Select
        id="mobile-action-sheet-select"
        options={choices}
        value={choice}
        onChange={handleChoiceChange}
        label="renderAsSheet"
        style={{ marginBottom: "2rem" }}
      />
      <MenuConfigurationProvider
        sheetHeader={<Header />}
        sheetFooter={<Footer />}
        renderAsSheet={renderAsSheet}
        // These can be configured as well. Showing the defaults for now
        // sheetPosition="below"
        // sheetVerticalSize="touch"
      >
        <DropdownMenu
          id="mobile-action-sheet"
          buttonChildren="Dropdown"
          // sheetStyle={{ margin: "0 2rem" }}
          // sheetClassName="my-custom-class-name"
        >
          <MenuItem disabled>Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
          <DropdownMenu
            id="child-mobile-action-sheet"
            buttonChildren="Child Dropdown"
          >
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
