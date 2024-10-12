"use client";
import { Box } from "@react-md/core/box/Box";
import { Button } from "@react-md/core/button/Button";
import { DialogContent } from "@react-md/core/dialog/DialogContent";
import { DialogHeader } from "@react-md/core/dialog/DialogHeader";
import { DialogTitle } from "@react-md/core/dialog/DialogTitle";
import { Option } from "@react-md/core/form/Option";
import { Select } from "@react-md/core/form/Select";
import { Sheet } from "@react-md/core/sheet/Sheet";
import { type SheetPosition } from "@react-md/core/sheet/styles";
import { Typography } from "@react-md/core/typography/Typography";
import { useToggle } from "@react-md/core/useToggle";
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
        onChange={(event) => {
          setPosition(event.currentTarget.value);
        }}
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
