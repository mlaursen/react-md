import React, { FC } from "react";
import { Button } from "@react-md/button";
import { Fieldset, Radio, useChoice } from "@react-md/form";
import { List, ListItem } from "@react-md/list";
import { Sheet, SheetPosition } from "@react-md/sheet";
import { useToggle } from "@react-md/utils";

const positions: SheetPosition[] = ["top", "right", "bottom", "left"];

const PositionExamples: FC = () => {
  const [position, handlePositionChange] = useChoice<SheetPosition>("left");
  const [visible, show, hide] = useToggle(false);

  return (
    <>
      <Fieldset legend="Sheet positions">
        {positions.map((pos) => (
          <Radio
            key={pos}
            id={`sheet-position-${pos}`}
            value={pos}
            name="positions"
            label={pos}
            checked={pos === position}
            onChange={handlePositionChange}
          />
        ))}
      </Fieldset>
      <Button
        id="show-sheet-position"
        onClick={show}
        theme="secondary"
        themeType="contained"
      >
        Show
      </Button>
      <Sheet
        id="example-sheet-1"
        aria-label="Example Sheet"
        visible={visible}
        onRequestClose={hide}
        position={position}
      >
        <List onClick={hide}>
          <ListItem id="example-sheet-item-1">Item 1</ListItem>
          <ListItem id="example-sheet-item-2">Item 2</ListItem>
          <ListItem id="example-sheet-item-3">Item 3</ListItem>
          <ListItem id="example-sheet-item-4">Item 4</ListItem>
          <ListItem id="example-sheet-item-5">Item 5</ListItem>
        </List>
      </Sheet>
    </>
  );
};

export default PositionExamples;
