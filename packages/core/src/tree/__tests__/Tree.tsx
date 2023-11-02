import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import {
  createRef,
  forwardRef,
  type AnchorHTMLAttributes,
  type ReactElement,
} from "react";
import {
  fireEvent,
  rmdRender,
  screen,
  userEvent,
  waitFor,
} from "../../test-utils/index.js";

import { Divider } from "../../divider/Divider.js";
import { FontIcon } from "../../icon/FontIcon.js";
import { TRANSITION_CONFIG } from "../../transition/config.js";
import { type RenderRecursiveItemsProps } from "../../utils/RenderRecursively.jsx";
import { alphaNumericSort } from "../../utils/alphaNumericSort.js";
import { isElementVisible } from "../../utils/isElementVisible.js";
import { DefaultTreeItemRenderer } from "../DefaultTreeItemRenderer.js";
import { Tree, type TreeProps } from "../Tree.js";
import { TreeItem } from "../TreeItem.js";
import {
  type DefaultTreeItemNode,
  type TreeData,
  type TreeItemNode,
} from "../types.js";
import { useTree, type TreeHookOptions } from "../useTree.js";
import { type TreeExpansion } from "../useTreeExpansion.js";
import { type TreeSelection } from "../useTreeSelection.js";

interface Folder {
  name: string;
  itemId: string;
  parentId: string | null;
}

const FOLDERS = {
  "folder-1": {
    name: "Folder 1",
    itemId: "folder-1",
    parentId: null,
  },
  "folder-2": {
    name: "Folder 2",
    itemId: "folder-2",
    parentId: null,
  },
  "folder-3": {
    name: "Folder 3",
    itemId: "folder-3",
    parentId: null,
  },
  "folder-2-1": {
    name: "Folder 2 Child 1",
    itemId: "folder-2-1",
    parentId: "folder-2",
  },
  "folder-2-2": {
    name: "Folder 2 Child 2",
    itemId: "folder-2-2",
    parentId: "folder-2",
  },
  "folder-2-3": {
    name: "Folder 2 Child 3",
    itemId: "folder-2-3",
    parentId: "folder-2",
  },
  "folder-2-2-1": {
    name: "Folder 2 Child 2 Child 1",
    itemId: "folder-2-2-1",
    parentId: "folder-2-2",
  },
  "folder-2-2-1-1": {
    name: "Folder 2 Child 2 Child 1 Child 1",
    itemId: "folder-2-2-1-1",
    parentId: "folder-2-2-1",
  },
} satisfies Record<string, Folder>;
const FRUITS_FOLDERS = {
  "item-1": {
    itemId: "item-1",
    parentId: null,
    name: "Oranges",
  },
  "item-2": {
    itemId: "item-2",
    parentId: null,
    name: "Apples",
  },
  "item-3": {
    itemId: "item-3",
    parentId: null,
    name: "Grapes",
  },
  "item-4": {
    itemId: "item-4",
    parentId: null,
    name: "Apricots",
  },
  "item-1-1": {
    itemId: "item-1-1",
    parentId: "item-1",
    name: "Orange 1",
  },
  "item-2-1": {
    itemId: "item-2-1",
    parentId: "item-2",
    name: "Apple 1",
  },
  "item-2-2": {
    itemId: "item-2-2",
    parentId: "item-2",
    name: "Apple 2",
  },
  "item-4-1": {
    itemId: "item-4-1",
    parentId: "item-4",
    name: "Delicious",
  },
  "item-4-2": {
    itemId: "item-4-2",
    parentId: "item-4",
    name: "Perfect",
  },
  "item-4-3": {
    itemId: "item-4-3",
    parentId: "item-4",
    name: "Bruised",
  },
} satisfies TreeData<Folder>;

interface TestProps
  extends Omit<
    TreeProps<Folder & TreeItemNode>,
    "data" | keyof TreeExpansion | keyof TreeSelection
  > {
  data?: TreeData<Folder>;
  options?: TreeHookOptions;
}

function Test(props: TestProps): ReactElement {
  const { options, ...remaining } = props;
  const tree = useTree(options);

  return <Tree data={FOLDERS} aria-label="Tree" {...remaining} {...tree} />;
}

describe("Tree", () => {
  beforeEach(() => {
    TRANSITION_CONFIG.disabled = false;
  });

  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLUListElement>();
    const props = {
      "aria-label": "Tree",
      treeRef: ref,
      data: {},
    } as const;
    const { rerender } = rmdRender(<Test {...props} />);

    const tree = screen.getByRole("tree", { name: "Tree" });
    expect(ref.current).toBeInstanceOf(HTMLUListElement);
    expect(ref.current).toBe(tree);
    expect(tree).toMatchSnapshot();

    rerender(
      <Test
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("should handle single select tree behavior", async () => {
    const user = userEvent.setup();
    rmdRender(<Test />);

    const tree = screen.getByRole("tree", { name: "Tree" });
    const folder1 = screen.getByRole("treeitem", { name: "Folder 1" });
    const folder2 = screen.getByRole("treeitem", { name: "Folder 2" });
    expect(folder1).toHaveAttribute("aria-selected", "false");
    expect(folder2).toHaveAttribute("aria-selected", "false");
    const groups = screen.getAllByRole("group");
    expect(groups).toHaveLength(3);
    const [subtree] = groups;
    expect(isElementVisible(subtree)).toBe(false);
    expect(tree).toMatchSnapshot();

    expect(isElementVisible(subtree)).toBe(false);

    await user.click(folder1);
    expect(folder1).toHaveAttribute("aria-selected", "true");
    expect(folder2).toHaveAttribute("aria-selected", "false");

    await user.click(folder2);
    expect(folder1).toHaveAttribute("aria-selected", "false");
    expect(folder2).toHaveAttribute("aria-selected", "true");
    expect(tree).toMatchSnapshot();

    await waitFor(() => {
      expect(isElementVisible(subtree)).toBe(true);
    });
    expect(tree).toMatchSnapshot();

    await user.click(folder1);
    expect(folder1).toHaveAttribute("aria-selected", "true");
    expect(folder2).toHaveAttribute("aria-selected", "false");
    expect(isElementVisible(subtree)).toBe(true);
    expect(tree).toMatchSnapshot();

    await user.click(folder2);
    expect(folder1).toHaveAttribute("aria-selected", "false");
    expect(folder2).toHaveAttribute("aria-selected", "true");
    await waitFor(() => {
      expect(isElementVisible(subtree)).toBe(false);
    });
    expect(tree).toMatchSnapshot();

    // you cannot deselect the last item for a single select tree
    await user.click(folder2);
    expect(folder1).toHaveAttribute("aria-selected", "false");
    expect(folder2).toHaveAttribute("aria-selected", "true");
  });

  it("should handle multi-select tree behavior", async () => {
    const user = userEvent.setup();
    rmdRender(<Test options={{ multiSelect: true }} />);

    const tree = screen.getByRole("tree", { name: "Tree" });
    const folder1 = screen.getByRole("treeitem", { name: "Folder 1" });
    const folder2 = screen.getByRole("treeitem", { name: "Folder 2" });
    expect(folder1).toHaveAttribute("aria-selected", "false");
    expect(folder2).toHaveAttribute("aria-selected", "false");
    const groups = screen.getAllByRole("group");
    expect(groups).toHaveLength(3);
    const [subtree] = groups;
    expect(isElementVisible(subtree)).toBe(false);
    expect(tree).toMatchSnapshot();

    await user.click(folder1);
    expect(folder1).toHaveAttribute("aria-selected", "true");
    expect(folder2).toHaveAttribute("aria-selected", "false");

    await user.click(folder2);
    expect(folder1).toHaveAttribute("aria-selected", "true");
    expect(folder2).toHaveAttribute("aria-selected", "true");
    expect(tree).toMatchSnapshot();

    await waitFor(() => {
      expect(isElementVisible(subtree)).toBe(true);
    });
    expect(tree).toMatchSnapshot();

    await user.click(folder1);
    expect(folder1).toHaveAttribute("aria-selected", "false");
    expect(folder2).toHaveAttribute("aria-selected", "true");
    expect(isElementVisible(subtree)).toBe(true);
    expect(tree).toMatchSnapshot();

    await user.click(folder2);
    expect(folder1).toHaveAttribute("aria-selected", "false");
    expect(folder2).toHaveAttribute("aria-selected", "false");
    await waitFor(() => {
      expect(isElementVisible(subtree)).toBe(false);
    });
    expect(tree).toMatchSnapshot();
  });

  it("should support default selected and expanded ids", () => {
    const { rerender } = rmdRender(
      <Test
        options={{
          defaultSelectedIds: [FOLDERS["folder-2-1"].itemId],
          defaultExpandedIds: [FOLDERS["folder-2"].itemId],
        }}
      />
    );

    const tree = screen.getByRole("tree", { name: "Tree" });
    expect(screen.getByRole("treeitem", { name: "Folder 2" })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    const folder21 = screen.getByRole("treeitem", {
      name: FOLDERS["folder-2-1"].name,
    });
    expect(folder21).toHaveAttribute("aria-selected", "true");
    expect(tree).toMatchSnapshot();

    rerender(
      <Test
        key="force-new-instance"
        options={{
          defaultSelectedIds: () => [FOLDERS["folder-2-1"].itemId],
          defaultExpandedIds: () => [FOLDERS["folder-2"].itemId],
        }}
      />
    );
    expect(tree).not.toBeInTheDocument();

    const rerenderedTree = screen.getByRole("tree", { name: "Tree" });
    expect(screen.getByRole("treeitem", { name: "Folder 2" })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    const rerenderedFolder21 = screen.getByRole("treeitem", {
      name: FOLDERS["folder-2-1"].name,
    });
    expect(rerenderedFolder21).toHaveAttribute("aria-selected", "true");
    expect(rerenderedTree).toMatchSnapshot();
  });

  it("should handle keyboard navigation correctly for single select trees", async () => {
    const user = userEvent.setup();
    rmdRender(<Test data={FRUITS_FOLDERS} />);

    const tree = screen.getByRole("tree", { name: "Tree" });
    const oranges = screen.getByRole("treeitem", { name: "Oranges" });
    const apples = screen.getByRole("treeitem", { name: "Apples" });
    const grapes = screen.getByRole("treeitem", { name: "Grapes" });
    const apricots = screen.getByRole("treeitem", { name: "Apricots" });
    expect(tree).toHaveAttribute("tabIndex", "0");
    expect(tree).toHaveAttribute("aria-activedescendant", "");

    await user.tab();
    expect(document.activeElement).toBe(tree);
    expect(tree).toHaveAttribute("tabIndex", "0");
    expect(tree).toHaveAttribute("aria-activedescendant", oranges.id);

    await user.keyboard("[ArrowDown]");
    expect(tree).toHaveAttribute("tabIndex", "0");
    expect(tree).toHaveAttribute("aria-activedescendant", apples.id);

    await user.keyboard("[End]");
    expect(tree).toHaveAttribute("tabIndex", "0");
    expect(tree).toHaveAttribute("aria-activedescendant", apricots.id);

    await user.keyboard("[ArrowUp]");
    expect(tree).toHaveAttribute("tabIndex", "0");
    expect(tree).toHaveAttribute("aria-activedescendant", grapes.id);

    await user.keyboard("[Home]");
    expect(tree).toHaveAttribute("tabIndex", "0");
    expect(tree).toHaveAttribute("aria-activedescendant", oranges.id);

    await user.keyboard("g");
    expect(tree).toHaveAttribute("tabIndex", "0");
    expect(tree).toHaveAttribute("aria-activedescendant", grapes.id);

    await user.keyboard("a");
    expect(tree).toHaveAttribute("tabIndex", "0");
    expect(tree).toHaveAttribute("aria-activedescendant", apricots.id);

    await user.keyboard("a");
    expect(tree).toHaveAttribute("tabIndex", "0");
    expect(tree).toHaveAttribute("aria-activedescendant", apples.id);

    // shift searches start from the beginning
    await user.keyboard("[ArrowDown]{Shift>}A{/Shift}");
    expect(tree).toHaveAttribute("tabIndex", "0");
    expect(tree).toHaveAttribute("aria-activedescendant", apples.id);

    // opening and closing folders
    expect(apples).toHaveAttribute("aria-expanded", "false");
    await user.keyboard("[ArrowLeft]");
    expect(apples).toHaveAttribute("aria-expanded", "false");
    expect(tree).toHaveAttribute("aria-activedescendant", apples.id);

    // first arrow right opens, second arrow right moves focus
    await user.keyboard("[ArrowRight][ArrowRight]");
    const apple1 = screen.getByRole("treeitem", { name: "Apple 1" });
    const apple2 = screen.getByRole("treeitem", { name: "Apple 2" });
    expect(apples).toHaveAttribute("aria-expanded", "true");
    expect(tree).toHaveAttribute("aria-activedescendant", apple1.id);

    await user.keyboard("[End]");
    expect(tree).toHaveAttribute("aria-activedescendant", apricots.id);
    await user.keyboard("[ArrowDown]aaa");
    expect(tree).toHaveAttribute("aria-activedescendant", apple2.id);

    await user.keyboard("[ArrowLeft]");
    expect(apples).toHaveAttribute("aria-expanded", "true");
    expect(tree).toHaveAttribute("aria-activedescendant", apples.id);

    await user.keyboard("[ArrowLeft]");
    expect(apples).toHaveAttribute("aria-expanded", "false");
    expect(tree).toHaveAttribute("aria-activedescendant", apples.id);

    // make sure you can't move into closing tree items
    expect(isElementVisible(apple1)).toBe(true);
    await user.keyboard("[ArrowDown]");
    await waitFor(() => {
      expect(isElementVisible(apple1)).toBe(false);
    });
    expect(tree).toHaveAttribute("aria-activedescendant", grapes.id);
  });

  it("should allow expansion to be triggered by clicking the icon only by setting the expansion mode to manual", async () => {
    const user = userEvent.setup();
    rmdRender(<Test expansionMode="manual" disableTransition />);

    const folder1 = screen.getByRole("treeitem", { name: "Folder 1" });
    const folder2 = screen.getByRole("treeitem", { name: "Folder 2" });
    await user.click(folder2);
    expect(folder2).toHaveAttribute("aria-expanded", "false");
    expect(folder2).toHaveAttribute("aria-selected", "true");

    const icon = folder2.querySelector(".rmd-icon-rotator");
    if (!icon) {
      throw new Error();
    }
    await user.click(icon);
    expect(folder2).toHaveAttribute("aria-expanded", "true");
    expect(folder2).toHaveAttribute("aria-selected", "true");

    await user.click(icon);
    expect(folder2).toHaveAttribute("aria-expanded", "false");
    expect(folder2).toHaveAttribute("aria-selected", "true");

    await user.click(folder1);
    expect(folder2).toHaveAttribute("aria-expanded", "false");
    expect(folder2).toHaveAttribute("aria-selected", "false");

    await user.keyboard("[ArrowDown][Space]");
    expect(folder2).toHaveAttribute("aria-expanded", "false");
    expect(folder2).toHaveAttribute("aria-selected", "true");

    await user.keyboard("[ArrowRight]");
    expect(folder2).toHaveAttribute("aria-expanded", "true");
    expect(folder2).toHaveAttribute("aria-selected", "true");

    await user.keyboard("[ArrowLeft]");
    expect(folder2).toHaveAttribute("aria-expanded", "false");
    expect(folder2).toHaveAttribute("aria-selected", "true");
  });

  it("should support conditionally rendering child trees by enabling temporaryChildItems", async () => {
    const user = userEvent.setup();
    rmdRender(<Test temporaryChildItems />);
    const tree = screen.getByRole("tree", { name: "Tree" });

    expect(tree.querySelectorAll("ul")).toHaveLength(0);
    expect(tree).toMatchSnapshot();

    await user.click(screen.getByRole("treeitem", { name: "Folder 2" }));
    expect(tree.querySelectorAll("ul")).toHaveLength(1);
    expect(tree).toMatchSnapshot();
  });

  it("should warn about orphaned items in non-production environments", () => {
    expect(process.env.NODE_ENV).toBe("test");
    const data = {
      "item-1-id": {
        itemId: "item-1-id",
        parentId: null,
        name: "Item 1",
      },
      "item-2-id": {
        itemId: "item-2-id",
        parentId: "does-not-exist",
        name: "Item 2",
      },
      "item-3-id": {
        itemId: "item-3-id",
        parentId: "does-not-exist-2",
        name: "Item 3",
      },
    } satisfies TreeData<Folder>;

    const warn = jest.spyOn(console, "warn").mockImplementation(() => {});
    const { rerender } = rmdRender(<Test data={data} />);
    expect(warn).toHaveBeenCalledWith(
      "The following tree items are orphaned without a parent:"
    );
    expect(warn).toHaveBeenCalledWith(
      Object.values({
        "item-2-id": {
          itemId: "item-2-id",
          parentId: "does-not-exist",
          name: "Item 2",
        },
        "item-3-id": {
          itemId: "item-3-id",
          parentId: "does-not-exist-2",
          name: "Item 3",
        },
      })
    );

    warn.mockReset();
    process.env.NODE_ENV = "production";
    rerender(<Test data={data} key="force-reset" />);
    expect(warn).not.toHaveBeenCalled();

    process.env.NODE_ENV = "test";
  });

  it("should support rendering the expander icon to the left of the item", () => {
    const { rerender } = rmdRender(<Test expanderLeft />);
    const tree = screen.getByRole("tree", { name: "Tree" });
    expect(tree).toMatchSnapshot();

    rerender(<Test expanderLeft expanderIcon={<span>v</span>} />);
    expect(tree).toMatchSnapshot("custom expander icon");

    const dataWithAddon = Object.values(FOLDERS).reduce<
      TreeData<Folder & DefaultTreeItemNode>
    >((updated, item) => {
      updated[item.itemId] = {
        ...item,
        leftAddon: <FontIcon>folder</FontIcon>,
      };

      return updated;
    }, {});
    rerender(<Test expanderLeft data={dataWithAddon} />);
    expect(tree).toMatchSnapshot("including left icon");
  });

  it("should support sorting the items", () => {
    rmdRender(
      <Test
        sort={(items) =>
          alphaNumericSort(items, { extractor: (item) => item.name })
        }
        data={FRUITS_FOLDERS}
      />
    );

    const oranges = screen.getByRole("treeitem", { name: "Oranges" });
    const apples = screen.getByRole("treeitem", { name: "Apples" });
    const grapes = screen.getByRole("treeitem", { name: "Grapes" });
    const apricots = screen.getByRole("treeitem", { name: "Apricots" });
    const items = screen
      .getAllByRole("treeitem")
      .filter((item) => isElementVisible(item));
    expect(items).toEqual([apples, apricots, grapes, oranges]);
  });

  it("should render the tree item as a link if the to or href exists on the item", () => {
    // set `to` to required just so it passes type checking
    const TestLinkComponent = forwardRef<
      HTMLAnchorElement,
      AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }
    >(function TestLinkComponent(props, ref) {
      const { to, href, ...remaining } = props;
      return <a href={to || href} {...remaining} ref={ref} />;
    });

    const data = {
      "item-1-id": {
        to: "/path-1",
        itemId: "item-1-id",
        parentId: null,
        children: "Link 1",
      },
      "item-2-id": {
        href: "https://example.com",
        itemId: "item-2-id",
        parentId: null,
        children: "Link 2",
      },
      "item-3-id": {
        href: "https://example.com",
        itemId: "item-3-id",
        parentId: null,
        children: "Link 3",
        disabled: true,
      },
    } satisfies TreeData;

    function Test(): ReactElement {
      const tree = useTree();

      return (
        <Tree
          aria-label="Tree"
          data={data}
          {...tree}
          linkComponent={TestLinkComponent}
        />
      );
    }

    rmdRender(<Test />);
    const tree = screen.getByRole("tree", { name: "Tree" });
    const link1 = screen.getByRole("treeitem", { name: "Link 1" });
    const link2 = screen.getByRole("treeitem", { name: "Link 2" });
    const link3 = screen.getByRole("treeitem", { name: "Link 3" });

    expect(link1).toHaveAttribute("href", "/path-1");
    expect(link2).toHaveAttribute("href", "https://example.com");
    expect(link3).not.toHaveAttribute("href");
    expect(tree).toMatchSnapshot();
  });

  it("should support custom renderers", async () => {
    const user = userEvent.setup();
    type CustomNode = DefaultTreeItemNode & { divider?: boolean };

    const data = {
      "item-1-id": {
        itemId: "item-1-id",
        parentId: null,
        children: "Item 1",
      },
      "item-2-id": {
        itemId: "item-2-id",
        parentId: null,
        children: "Item 2",
      },
      "item-2-1-id": {
        itemId: "item-2-1-id",
        parentId: "item-2-id",
        children: "Item 2-1",
      },
      "item-2-2-id": {
        itemId: "item-2-2-id",
        parentId: "item-2-id",
        divider: true,
      },
      "item-2-3-id": {
        itemId: "item-2-3-id",
        parentId: "item-2-id",
        children: "Item 2-2",
      },
    } satisfies TreeData<CustomNode>;
    function CustomRenderer(
      props: RenderRecursiveItemsProps<CustomNode>
    ): ReactElement {
      const { item } = props;
      if (item.divider) {
        return <Divider key={item.itemId} />;
      }

      return <DefaultTreeItemRenderer {...props} />;
    }

    function Test() {
      return (
        <Tree
          {...useTree({
            defaultExpandedIds: ["item-2-id"],
          })}
          data={data}
          aria-label="Tree"
          renderer={CustomRenderer}
          disableTransition
          temporaryChildItems
        />
      );
    }

    rmdRender(<Test />);
    const item21 = screen.getByRole("treeitem", { name: "Item 2-1" });
    const item22 = screen.getByRole("treeitem", { name: "Item 2-2" });
    const divider = screen.getByRole("separator");

    await user.click(divider);
    expect(item21).toBeInTheDocument();
    expect(item22).toBeInTheDocument();
    expect(divider).toBeInTheDocument();
  });

  it("should support custom event handlers", () => {
    const onClick = jest.fn();
    const onKeyDown = jest.fn();
    const onKeyUp = jest.fn();
    const onMouseDown = jest.fn();
    const onMouseLeave = jest.fn();
    const onDragStart = jest.fn();
    const onTouchStart = jest.fn();
    const onTouchEnd = jest.fn();
    const onTouchMove = jest.fn();
    function CustomRenderer(
      props: RenderRecursiveItemsProps<Folder>
    ): ReactElement {
      const { item, parents, children } = props;
      return (
        <TreeItem
          itemId={item.itemId}
          depth={parents.length}
          childItems={children}
          onClick={onClick}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onDragStart={onDragStart}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchMove={onTouchMove}
        >
          {item.name}
        </TreeItem>
      );
    }

    rmdRender(<Test renderer={CustomRenderer} />);

    const folder1 = screen.getByRole("treeitem", { name: "Folder 1" });
    fireEvent.click(folder1);
    expect(onClick).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(folder1);
    expect(onKeyDown).toHaveBeenCalledTimes(1);

    fireEvent.keyUp(folder1);
    expect(onKeyUp).toHaveBeenCalledTimes(1);

    fireEvent.mouseDown(folder1);
    expect(onMouseDown).toHaveBeenCalledTimes(1);

    fireEvent.mouseLeave(folder1);
    expect(onMouseLeave).toHaveBeenCalledTimes(1);

    fireEvent.dragStart(folder1);
    expect(onDragStart).toHaveBeenCalledTimes(1);

    fireEvent.touchStart(folder1);
    expect(onTouchStart).toHaveBeenCalledTimes(1);

    fireEvent.touchMove(folder1);
    expect(onTouchMove).toHaveBeenCalledTimes(1);

    fireEvent.touchEnd(folder1);
    expect(onTouchEnd).toHaveBeenCalledTimes(1);
  });
});
