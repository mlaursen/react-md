import { Button, DropdownMenu, MenuItem } from "react-md";
import { useState, type ReactElement } from "react";

export default function ControllingMenuVisibility(): ReactElement {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button onClick={() => setVisible(true)}>Open</Button>
      <DropdownMenu
        buttonChildren="Options..."
        visible={visible}
        setVisible={setVisible}
      >
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <MenuItem>Item 3</MenuItem>
      </DropdownMenu>
    </>
  );
}
