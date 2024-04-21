import { describe, expect, it } from "@jest/globals";
import { cnb } from "cnbuilder";
import { type ReactElement } from "react";
import { Divider } from "../../divider/Divider.js";
import { List } from "../../list/List.js";
import { render, screen } from "../../test-utils/index.js";
import {
  type RenderRecursiveItemsProps,
  RenderRecursively,
} from "../RenderRecursively.js";

type Item =
  | {
      id: string;
      name: string;
      items?: Item[];
    }
  | { id: string; divider: boolean };

const items: Item[] = [
  {
    id: "item-1",
    name: "Item 1",
    items: [
      {
        id: "item-1-1",
        name: "Item 1-1",
      },
      {
        id: "divider-1-1",
        divider: true,
      },
      {
        id: "item-1-2",
        name: "Item 1-2",
        items: [
          {
            id: "item-1-2-1",
            name: "Item 1-2-1",
          },
        ],
      },
    ],
  },
  {
    id: "item-2",
    name: "Item 2",
  },
];

function Render(props: RenderRecursiveItemsProps<Item, string>): ReactElement {
  const { item, parents, data, children } = props;
  if ("divider" in item) {
    return <Divider />;
  }

  return (
    <List style={{ "--rmd-tree-depth": parents.length }}>
      <li data-testid={item.id} className={cnb(item.id === data && "active")}>
        {item.name}
      </li>
      {children && <List>{children}</List>}
    </List>
  );
}

function Test(): ReactElement {
  const activeId = "item-1-1";
  return (
    <RenderRecursively
      data={activeId}
      items={items}
      render={Render}
      getItemKey={({ item }) => item.id}
    />
  );
}

describe("RenderRecursively", () => {
  it("should pass data down to each component and be strictly type-checked", () => {
    const { container } = render(<Test />);

    const item11 = screen.getByTestId("item-1-1");
    expect(item11).toHaveClass("active");
    expect(container).toMatchSnapshot();
  });
});
