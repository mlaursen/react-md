import React, { FC, useState } from "react";
import { DropdownMenu } from "@react-md/menu";
import { Text } from "@react-md/typography";

import Code from "components/Code/Code";

const AddingOnClick: FC = () => {
  const [value, setValue] = useState("None");

  const onClick = (event: React.MouseEvent): void => {
    setValue(event.currentTarget.textContent || "");
  };
  return (
    <>
      <Text type="headline-6" margin="none">
        Adding <Code>onClick</Code>
      </Text>
      <Text>
        Last clicked value: <Code>{value}</Code>
      </Text>
      <DropdownMenu
        id="event-handler-menu-1"
        items={[
          {
            onClick,
            children: "Item 1",
          },
          {
            onClick,
            children: "Item 2",
          },
          {
            onClick,
            children: "Item 3",
          },
          {
            onClick,
            children: "Item 4",
          },
        ]}
      >
        Options
      </DropdownMenu>
    </>
  );
};

export default AddingOnClick;
