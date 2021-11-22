import { ReactElement, useState } from "react";
import { DropdownMenu } from "@react-md/menu";
import { Typography } from "@react-md/typography";

import Code from "components/Code";

export default function AddingOnClick(): ReactElement {
  const [value, setValue] = useState("None");

  const onClick = (event: React.MouseEvent): void => {
    setValue(event.currentTarget.textContent || "");
  };
  return (
    <>
      <Typography type="headline-6" margin="none">
        Adding <Code>onClick</Code>
      </Typography>
      <Typography>
        Last clicked value: <Code>{value}</Code>
      </Typography>
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
}
