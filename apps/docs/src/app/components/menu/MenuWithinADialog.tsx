"use client";
import {
  Button,
  Dialog,
  DialogContent,
  DropdownMenu,
  MenuItem,
  Typography,
  useToggle,
} from "react-md";
import { type ReactElement } from "react";

export default function MenuWithinADialog(): ReactElement {
  const { toggled, enable, disable } = useToggle();
  return (
    <>
      <Button onClick={enable}>Show Dialog</Button>
      <Dialog aria-label="Example" visible={toggled} onRequestClose={disable}>
        <DialogContent>
          <Typography>
            {
              "Here is a paragraph of text. Even though it's really only two sentences."
            }
          </Typography>
          <DropdownMenu buttonChildren="Dropdown">
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
            <MenuItem>Item 3</MenuItem>
          </DropdownMenu>
        </DialogContent>
      </Dialog>
    </>
  );
}
