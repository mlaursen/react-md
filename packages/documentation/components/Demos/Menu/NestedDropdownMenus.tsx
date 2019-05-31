import React, { FC, Fragment } from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  MenuItemSeparator,
} from "@react-md/menu";
import { Text } from "@react-md/typography";
import { useToggle } from "@react-md/utils";
import { TextIconSpacing } from "@react-md/icon";

const InfiniteNestedMenus: FC<{
  depth: number;
  index: number;
  portal: boolean;
}> = ({ depth, index, portal }) => (
  <DropdownMenuItem
    id={`nested-menu-depth-${index}-${depth}`}
    portal={portal}
    items={[
      "Item 1",
      "Item 2",
      ...Array.from(new Array(4), (_, i) => (
        <InfiniteNestedMenus depth={depth + 1} index={i} portal={portal} />
      )),
      "Item 8",
    ]}
  >
    {`Current depth: ${depth} and index: ${index}`}
  </DropdownMenuItem>
);

const NestedDropdownMenus: FC = () => {
  const { toggled: portal, setToggled: setPortal } = useToggle(true);

  return (
    <Fragment>
      <Text>
        <TextIconSpacing
          icon={
            <input
              id="nested-menu-portal"
              type="checkbox"
              onChange={event => setPortal(event.currentTarget.checked)}
              checked={portal}
            />
          }
          iconAfter
        >
          <label htmlFor="nested-menu-portal">Enable portal?</label>
        </TextIconSpacing>
      </Text>
      <DropdownMenu
        id="simple-nested-menus-example"
        portal={portal}
        items={[
          "Item 1",
          "Item 2",
          <MenuItemSeparator />,
          <InfiniteNestedMenus depth={0} index={0} portal={portal} />,
          "Item 4",
          "Item 5",
        ]}
      >
        Simple
      </DropdownMenu>
    </Fragment>
  );
};

export default NestedDropdownMenus;
