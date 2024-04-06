"use client";
import {
  Box,
  Button,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Option,
  Select,
  Sheet,
  Typography,
  useToggle,
  type SheetPosition,
} from "react-md";
import { useState, type ReactElement } from "react";

export default function SheetPositionsExample(): ReactElement {
  const { toggled, enable, disable } = useToggle();
  const [position, setPosition] = useState<SheetPosition>("left");

  return (
    <Box stacked>
      <Button onClick={enable}>Show</Button>
      <Select
        label="Sheet Position"
        value={position}
        onChange={(event) => setPosition(event.currentTarget.value)}
      >
        {positions.map((position) => (
          <Option key={position} value={position}>
            {position}
          </Option>
        ))}
      </Select>
      <Sheet
        aria-label="Example"
        position={position}
        visible={toggled}
        onRequestClose={disable}
      >
        <DialogHeader>
          <DialogTitle>Title</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <Typography>Hello, world!</Typography>
        </DialogContent>
      </Sheet>
    </Box>
  );
}

const positions: readonly SheetPosition[] = ["left", "right", "top", "bottom"];
