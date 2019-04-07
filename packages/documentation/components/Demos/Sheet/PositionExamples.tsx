import React, {
  FunctionComponent,
  useState,
  Fragment,
  useCallback,
} from "react";
import { Sheet, SheetPosition } from "@react-md/sheet";
import { Button } from "@react-md/button";
import { List, ListItem } from "@react-md/list";
import { useToggle } from "@react-md/utils";

const PositionExamples: FunctionComponent = () => {
  const [position, setPosition] = useState<SheetPosition>("bottom");
  const { toggled, disable, toggle } = useToggle();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPosition(event.currentTarget.value as SheetPosition);
    },
    []
  );

  return (
    <Fragment>
      <Button
        id="sheet-position-example-toggle"
        onClick={toggle}
        theme="clear"
        themeType="outline"
      >
        Show Sheet
      </Button>
      {["top", "right", "bottom", "left"].map(pos => (
        <div key={pos}>
          <label htmlFor={`sheet-position-${pos}`}>{pos}</label>
          <input
            id={`sheet-position-${pos}-input`}
            name="sheet-positions"
            type="radio"
            value={pos}
            checked={pos === position}
            onChange={handleChange}
          />
        </div>
      ))}
      <Sheet
        id="sheet-position-example"
        visible={toggled}
        position={position || "bottom"}
        onRequestClose={disable}
      >
        <List>
          <ListItem id="sheet-item-1">Item 1</ListItem>
          <ListItem id="sheet-item-2">Item 2</ListItem>
          <ListItem id="sheet-item-3">Item 3</ListItem>
          <ListItem id="sheet-item-4">Item 4</ListItem>
          <ListItem id="sheet-item-5">Item 5</ListItem>
          <ListItem id="sheet-item-6">Item 6</ListItem>
        </List>
      </Sheet>
    </Fragment>
  );
};

export default PositionExamples;
