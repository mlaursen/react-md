import React, { FunctionComponent, useState, Fragment } from "react";
import { DropdownMenu } from "@react-md/menu";
import { Text } from "@react-md/typography";
import Code from "components/Code/Code";

const AddingEventHandlers: FunctionComponent = () => {
  const [value1, setValue1] = useState("None");
  const [value2, setValue2] = useState("None");

  const handleItemClick1 = (event: React.MouseEvent) => {
    setValue1(event.currentTarget.textContent || "");
  };

  return (
    <Fragment>
      <Text>
        Last clicked value: <Code>{value1}</Code>
      </Text>
      <DropdownMenu
        id="event-handler-menu-1"
        menuLabelledby="event-handler-menu-1"
        items={[
          {
            onClick: handleItemClick1,
            children: "Item 1",
          },
          {
            onClick: handleItemClick1,
            children: "Item 2",
          },
          {
            onClick: handleItemClick1,
            children: "Item 3",
          },
          {
            onClick: handleItemClick1,
            children: "Item 4",
          },
        ]}
      >
        Options...
      </DropdownMenu>
      <Text>
        Last clicked value: <Code>{value2}</Code>
      </Text>
      <DropdownMenu
        id="event-handler-menu-2"
        menuLabelledby="event-handler-menu-2"
        items={["Item 1", "Item 2", "Item 3", "Item 4"]}
        onItemClick={(item, event) => {
          setValue2(item as string);
          console.log("event:", event);
        }}
      >
        Options...
      </DropdownMenu>
    </Fragment>
  );
};

export default AddingEventHandlers;
